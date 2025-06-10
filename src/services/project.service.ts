import { axiosClassic } from '@/api/axios'

import type { ApiResponse, CreateProjectDto, IProject } from '@/types/api.types'

class ProjectService {
	private BASE_URL = '/projects'

	async getAll(userId: string) {
		return axiosClassic.get<ApiResponse<IProject[]>>(`${this.BASE_URL}?userId=${userId}`)
	}

	async getById(id: string) {
		return axiosClassic.get<ApiResponse<IProject>>(`${this.BASE_URL}/${id}`)
	}

	async create(data: CreateProjectDto) {
		return axiosClassic.post<ApiResponse<IProject>>(this.BASE_URL, data)
	}

	async update(id: string, data: CreateProjectDto) {
		return axiosClassic.patch<ApiResponse<IProject>>(`${this.BASE_URL}/${id}`, data)
	}

	async delete(id: string) {
		return axiosClassic.delete<ApiResponse<IProject>>(`${this.BASE_URL}/${id}`)
	}
}

export const projectService = new ProjectService()
