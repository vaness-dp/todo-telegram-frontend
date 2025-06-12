import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { CreateProjectDto, IProject } from '@/types/api.types'

import { projectKeys } from './keys'
import { projectService } from '@/services/project.service'

export function useCreateProject() {
	const queryClient = useQueryClient()

	type Context = { previousProjects?: IProject[] }

	return useMutation<IProject, Error, CreateProjectDto, Context>({
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
		onMutate: async newProject => {
			await queryClient.cancelQueries({ queryKey: projectKeys.lists() })
			const previousProjects = queryClient.getQueryData<IProject[]>(projectKeys.lists())
			const now = new Date().toISOString()
			const optimisticProject: IProject = {
				_id: Math.random().toString(36).slice(2),
				id: Math.random().toString(36).slice(2),
				name: newProject.name,
				description: newProject.description,
				tasks: [],
				tasksCount: { total: 0, completed: 0 },
				userId: newProject.userId,
				createdAt: now,
				updatedAt: now
			}
			queryClient.setQueryData<IProject[]>(projectKeys.lists(), old => [
				optimisticProject,
				...(old || [])
			])
			return { previousProjects }
		},
		onError: (_err, _newProject, context) => {
			if (context?.previousProjects) {
				queryClient.setQueryData(projectKeys.lists(), context.previousProjects)
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: projectKeys.lists() })
		}
	})
}
