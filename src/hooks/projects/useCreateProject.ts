import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { CreateProjectDto, IProject } from '@/types/api.types'

import { projectKeys } from './keys'
import { projectService } from '@/services/project.service'

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
