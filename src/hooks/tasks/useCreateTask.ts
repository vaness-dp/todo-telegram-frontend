import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { CreateTaskDto, IProject, ITask } from '@/types/api.types'

import { projectKeys } from '../projects/keys'

import { taskKeys } from './keys'
import { taskService } from '@/services/task.service'

export function useCreateTask() {
	const queryClient = useQueryClient()

	return useMutation<ITask, Error, CreateTaskDto>({
		mutationFn: async (data: CreateTaskDto) => {
			const { data: response } = await taskService.create(data)
			return response.data
		},
		onSuccess: task => {
			queryClient.invalidateQueries({ queryKey: taskKeys.list(task.projectId) })

			queryClient.setQueriesData<IProject[]>({ queryKey: projectKeys.lists() }, projects => {
				if (!projects) return projects

				return projects.map(project => {
					if (project._id === task.projectId) {
						const updatedTasks = [...(project.tasks || []), task]
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
