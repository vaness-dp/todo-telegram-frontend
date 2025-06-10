import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type { CreateProjectDto, IProject } from '@/types/api.types'

import { projectService } from '@/services/project.service'
import { taskService } from '@/services/task.service'

export const projectKeys = {
	all: ['projects'] as const,
	lists: () => [...projectKeys.all, 'list'] as const,
	list: (filters: string) => [...projectKeys.lists(), { filters }] as const,
	details: () => [...projectKeys.all, 'detail'] as const,
	detail: (id: string) => [...projectKeys.details(), id] as const
}

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

export function useCreateProject() {
	const queryClient = useQueryClient()

	return useMutation<IProject, Error, CreateProjectDto>({
		mutationFn: async (data: CreateProjectDto) => {
			const { data: response } = await projectService.create(data)
			return {
				...response.data,
				tasks: [],
				tasksCount: {
					total: 0,
					completed: 0
				}
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: projectKeys.lists() })
		}
	})
}

export function useDeleteProject() {
	const queryClient = useQueryClient()

	return useMutation<IProject, Error, string>({
		mutationFn: async (id: string) => {
			const { data: response } = await projectService.delete(id)
			return response.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: projectKeys.lists() })
		}
	})
}
