import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { IProject } from '@/types/api.types'

import { projectKeys } from '../projects/keys'

import { taskKeys } from './keys'
import { taskService } from '@/services/task.service'

export function useDeleteTask() {
	const queryClient = useQueryClient()

	return useMutation<void, Error, { id: string; projectId: string }>({
		mutationFn: async ({ id }) => {
			const { data: response } = await taskService.delete(id)
			return response.data
		},
		onSuccess: (_, { id, projectId }) => {
			// Обновляем список задач проекта
			queryClient.invalidateQueries({ queryKey: taskKeys.list(projectId) })

			// Обновляем список проектов
			queryClient.setQueriesData<IProject[]>({ queryKey: projectKeys.lists() }, projects => {
				if (!projects) return projects

				return projects.map(project => {
					if (project._id === projectId) {
						const updatedTasks = project.tasks?.filter(task => task._id !== id) || []
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
		}
	})
}
