import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { IProject } from '@/types/api.types'

import { projectKeys } from './keys'
import { projectService } from '@/services/project.service'

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
