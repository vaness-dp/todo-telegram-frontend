export enum Priority {
	HIGH = 'high',
	MEDIUM = 'medium',
	LOW = 'low'
}

export interface ApiResponse<T> {
	success: boolean
	count?: number
	data: T
	error?: string
}

export interface ITask {
	_id: string
	title: string
	priority: Priority
	completed: boolean
	projectId: string
}

export interface IProject {
	_id: string
	name: string
	description?: string
	tasks?: ITask[]
	tasksCount?: {
		total: number
		completed: number
	}
	userId: string
	createdAt: string
	updatedAt: string
	id: string
}

export interface CreateProjectDto {
	name: string
	description?: string
	userId: string
}

export interface CreateTaskDto {
	title: string
	priority: Priority
	projectId: string
}

export interface UpdateTaskDto {
	completed?: boolean
}
