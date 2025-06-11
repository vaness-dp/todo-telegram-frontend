import { useQuery } from '@tanstack/react-query'

import type { IProject } from '@/types/api.types'

import { projectKeys } from './keys'
import { projectService } from '@/services/project.service'
import { taskService } from '@/services/task.service'

export function useProject(id: string) {
	return useQuery<IProject>({
		queryKey: projectKeys.detail(id),
		queryFn: async () => {
			const { data: projectResponse } = await projectService.getById(id)
			const project = projectResponse.data

			try {
				const { data: tasksResponse } = await taskService.getAll(id)
				const tasks = tasksResponse.data

				return {
					...project,
					tasks,
					tasksCount: {
						total: tasks.length,
						completed: tasks.filter(task => task.completed).length
					}
				}
			} catch (error) {
				console.error(`Failed to fetch tasks for project ${id}:`, error)
				return {
					...project,
					tasks: [],
					tasksCount: {
						total: 0,
						completed: 0
					}
				}
			}
		}
	})
}
