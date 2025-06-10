import { useQuery } from '@tanstack/react-query'

import type { ITask } from '@/types/api.types'

import { taskKeys } from './keys'
import { taskService } from '@/services/task.service'

export function useGetTasks(projectId: string) {
	return useQuery<ITask[]>({
		queryKey: taskKeys.list(projectId),
		queryFn: async () => {
			const { data } = await taskService.getAll(projectId)
			return data.data
		}
	})
}
