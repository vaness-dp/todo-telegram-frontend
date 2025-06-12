import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { IProject } from '@/types/api.types'

import { projectKeys } from './keys'
import { projectService } from '@/services/project.service'

export function useDeleteProject() {
	const queryClient = useQueryClient()

	type Context = { previousProjects?: IProject[] }

	return useMutation<IProject, Error, string, Context>({
		mutationFn: async (id: string) => {
			const { data: response } = await projectService.delete(id)
			return response.data
		},
		onMutate: async id => {
			await queryClient.cancelQueries({ queryKey: projectKeys.lists() })
			const previousProjects = queryClient.getQueryData<IProject[]>(projectKeys.lists())
			queryClient.setQueryData<IProject[]>(projectKeys.lists(), old =>
				(old || []).filter(p => p._id !== id)
			)
			return { previousProjects }
		},
		onError: (_err, _id, context) => {
			if (context?.previousProjects) {
				queryClient.setQueryData(projectKeys.lists(), context.previousProjects)
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: projectKeys.lists() })
		}
	})
}
