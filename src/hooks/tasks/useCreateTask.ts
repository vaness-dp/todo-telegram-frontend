import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { CreateTaskDto, IProject, ITask } from '@/types/api.types'

import { projectKeys } from '../projects/keys'

import { taskKeys } from './keys'
import { taskService } from '@/services/task.service'

export function useCreateTask() {
	const queryClient = useQueryClient()

	type Context = { previousTasks?: ITask[] }

	return useMutation<ITask, Error, CreateTaskDto, Context>({
		mutationFn: async (data: CreateTaskDto) => {
			const { data: response } = await taskService.create(data)
			return response.data
		},
		onMutate: async newTask => {
			await queryClient.cancelQueries({ queryKey: taskKeys.list(newTask.projectId) })
			const previousTasks = queryClient.getQueryData<ITask[]>(taskKeys.list(newTask.projectId))
			const optimisticTask: ITask = {
				_id: Math.random().toString(36).slice(2),
				title: newTask.title,
				priority: newTask.priority,
				completed: false,
				projectId: newTask.projectId
			}
			queryClient.setQueryData<ITask[]>(taskKeys.list(newTask.projectId), old => [
				optimisticTask,
				...(old || [])
			])
			queryClient.setQueriesData<IProject[]>({ queryKey: projectKeys.lists() }, projects => {
				if (!projects) return projects
				return projects.map(project => {
					if (project._id === newTask.projectId) {
						const updatedTasks = [optimisticTask, ...(project.tasks || [])]
						return {
							...project,
							tasks: updatedTasks,
							tasksCount: {
								total: updatedTasks.length,
								completed: updatedTasks.filter(t => t.completed).length
							}
						}
					}
					return project
				})
			})
			return { previousTasks }
		},
		onError: (_err, newTask, context) => {
			if (context?.previousTasks) {
				queryClient.setQueryData(taskKeys.list(newTask.projectId), context.previousTasks)
			}
		},
		onSettled: (_data, _error, variables) => {
			queryClient.invalidateQueries({ queryKey: taskKeys.list(variables.projectId) })
			queryClient.invalidateQueries({ queryKey: projectKeys.lists() })
		}
	})
}
