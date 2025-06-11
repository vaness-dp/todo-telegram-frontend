import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { IProject, ITask } from '@/types/api.types'

import { projectKeys } from '../projects/keys'

import { taskKeys } from './keys'
import { taskService } from '@/services/task.service'

interface ToggleTaskContext {
	previousTasks: ITask[] | undefined
}

export function useToggleTask() {
	const queryClient = useQueryClient()

	return useMutation<ITask, Error, { id: string; projectId: string }, ToggleTaskContext>({
		mutationFn: async ({ id }) => {
			const { data: response } = await taskService.toggleComplete(id)
			return response.data
		},
		onMutate: async ({ id, projectId }) => {
			await queryClient.cancelQueries({ queryKey: taskKeys.list(projectId) })

			const previousTasks = queryClient.getQueryData<ITask[]>(taskKeys.list(projectId))

			if (previousTasks) {
				const updatedTasks = previousTasks.map(task =>
					task._id === id ? { ...task, completed: !task.completed } : task
				)

				queryClient.setQueryData<ITask[]>(taskKeys.list(projectId), updatedTasks)

				queryClient.setQueriesData<IProject[]>({ queryKey: projectKeys.lists() }, projects => {
					if (!projects) return projects

					return projects.map(project => {
						if (project._id === projectId) {
							const updatedProjectTasks =
								project.tasks?.map(task =>
									task._id === id ? { ...task, completed: !task.completed } : task
								) || []

							return {
								...project,
								tasks: updatedProjectTasks,
								tasksCount: {
									total: updatedProjectTasks.length,
									completed: updatedProjectTasks.filter(t => t.completed).length
								}
							}
						}
						return project
					})
				})
			}

			return { previousTasks }
		},
		onError: (_err, { projectId }, context) => {
			if (context?.previousTasks) {
				queryClient.setQueryData(taskKeys.list(projectId), context.previousTasks)
			}
		},
		onSettled: (_, __, { projectId }) => {
			queryClient.invalidateQueries({ queryKey: taskKeys.list(projectId) })
			queryClient.invalidateQueries({ queryKey: projectKeys.lists() })
		}
	})
}
