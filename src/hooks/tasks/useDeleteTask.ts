import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { IProject, ITask } from '@/types/api.types'

import { projectKeys } from '../projects/keys'

import { taskKeys } from './keys'
import { taskService } from '@/services/task.service'

export function useDeleteTask() {
	const queryClient = useQueryClient()

	type Context = { previousTasks?: ITask[] }

	return useMutation<void, Error, { id: string; projectId: string }, Context>({
		mutationFn: async ({ id }) => {
			const { data: response } = await taskService.delete(id)
			return response.data
		},
		onMutate: async ({ id, projectId }) => {
			await queryClient.cancelQueries({ queryKey: taskKeys.list(projectId) })
			const previousTasks = queryClient.getQueryData<ITask[]>(taskKeys.list(projectId))
			queryClient.setQueryData<ITask[]>(taskKeys.list(projectId), old =>
				(old || []).filter(t => t._id !== id)
			)
			queryClient.setQueriesData<IProject[]>({ queryKey: projectKeys.lists() }, projects => {
				if (!projects) return projects
				return projects.map(project => {
					if (project._id === projectId) {
						const updatedTasks = (project.tasks || []).filter(t => t._id !== id)
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
		onError: (_err, variables, context) => {
			if (context?.previousTasks) {
				queryClient.setQueryData(taskKeys.list(variables.projectId), context.previousTasks)
			}
		},
		onSettled: (_data, _error, variables) => {
			queryClient.invalidateQueries({ queryKey: taskKeys.list(variables.projectId) })
			queryClient.invalidateQueries({ queryKey: projectKeys.lists() })
		}
	})
}
