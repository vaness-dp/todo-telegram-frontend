import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { ITask, UpdateTaskDto } from '@/types/api.types'

import { taskKeys } from './keys'
import { taskService } from '@/services/task.service'

export function useUpdateTask() {
	const queryClient = useQueryClient()

	return useMutation<ITask, Error, { id: string; data: UpdateTaskDto; projectId: string }>({
		mutationFn: async ({ id, data }) => {
			const { data: response } = await taskService.update(id, data)
			return response.data
		},
		onSuccess: task => {
			queryClient.invalidateQueries({
				queryKey: taskKeys.list(task.projectId)
			})
		}
	})
}
