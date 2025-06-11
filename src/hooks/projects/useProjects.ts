import { useQuery } from '@tanstack/react-query'

import type { IProject } from '@/types/api.types'

import { projectKeys } from './keys'
import { projectService } from '@/services/project.service'
import { taskService } from '@/services/task.service'

export function useProjects(userId: string) {
	return useQuery<IProject[]>({
		queryKey: projectKeys.lists(),
		queryFn: async () => {
			const { data: projectsResponse } = await projectService.getAll(userId)
			const projects = projectsResponse.data

			const projectsWithTasks = await Promise.all(
				projects.map(async project => {
					try {
						const { data: tasksResponse } = await taskService.getAll(project._id)
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
						console.error(`Failed to fetch tasks for project ${project._id}:`, error)
						return {
							...project,
							tasks: [],
							tasksCount: {
								total: 0,
								completed: 0
							}
						}
					}
				})
			)

			return projectsWithTasks
		}
	})
}
