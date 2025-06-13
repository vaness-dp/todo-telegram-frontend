import { useQuery } from '@tanstack/react-query'

import type { IProject } from '@/types/api.types'

import { projectKeys } from './keys'
import { projectService } from '@/services/project.service'
import { taskService } from '@/services/task.service'

export function useProject(id: string) {
	return useQuery<IProject>({
		queryKey: projectKeys.detail(id),
		queryFn: async () => {
			const [projectResponse, tasksResponse] = await Promise.all([
				projectService.getById(id),
				taskService.getAll(id).catch(error => {
					console.error(`Failed to fetch tasks for project ${id}:`, error)
					return { data: { data: [] } }
				})
			])

			const project = projectResponse.data.data
			const tasks = tasksResponse.data.data

			return {
				...project,
				tasks,
				tasksCount: {
					total: tasks.length,
					completed: tasks.filter(task => task.completed).length
				}
			}
		},
		staleTime: 30 * 1000, // 30 seconds
		gcTime: 5 * 60 * 1000 // 5 minutes
	})
}
