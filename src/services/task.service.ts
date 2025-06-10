import { axiosClassic } from '@/api/axios'

import type { ApiResponse, CreateTaskDto, ITask, UpdateTaskDto } from '@/types/api.types'

class TaskService {
	private BASE_URL = '/tasks'

	async getAll(projectId: string) {
		return axiosClassic.get<ApiResponse<ITask[]>>(`/projects/${projectId}/tasks`)
	}

	async create(data: CreateTaskDto) {
		try {
			const response = await axiosClassic.post<ApiResponse<ITask>>(this.BASE_URL, data)
			return response
		} catch (error) {
			throw error
		}
	}

	async update(id: string, data: UpdateTaskDto) {
		return axiosClassic.patch<ApiResponse<ITask>>(`${this.BASE_URL}/${id}`, data)
	}

	async delete(id: string) {
		return axiosClassic.delete<ApiResponse<void>>(`${this.BASE_URL}/${id}`)
	}

	async toggleComplete(id: string) {
		return axiosClassic.patch<ApiResponse<ITask>>(`${this.BASE_URL}/${id}/toggle`)
	}
}

export const taskService = new TaskService()
