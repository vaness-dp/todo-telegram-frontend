import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { IProject, ITask } from '@/types/api.types'

import { projectKeys } from '../useProjects'

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
			// Отменяем все текущие запросы для этого списка задач
			await queryClient.cancelQueries({ queryKey: taskKeys.list(projectId) })

			// Получаем предыдущее состояние
			const previousTasks = queryClient.getQueryData<ITask[]>(taskKeys.list(projectId))

			// Оптимистично обновляем UI
			if (previousTasks) {
				const updatedTasks = previousTasks.map(task =>
					task._id === id ? { ...task, completed: !task.completed } : task
				)

				queryClient.setQueryData<ITask[]>(taskKeys.list(projectId), updatedTasks)

				// Обновляем список проектов
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

			// Возвращаем контекст с предыдущим состоянием
			return { previousTasks }
		},
		onError: (err, { projectId }, context) => {
			// При ошибке возвращаем предыдущее состояние
			if (context?.previousTasks) {
				queryClient.setQueryData(taskKeys.list(projectId), context.previousTasks)
			}
		},
		onSettled: (_, __, { projectId }) => {
			// В любом случае инвалидируем кеш для обновления данных
			queryClient.invalidateQueries({ queryKey: taskKeys.list(projectId) })
			queryClient.invalidateQueries({ queryKey: projectKeys.lists() })
		}
	})
}
