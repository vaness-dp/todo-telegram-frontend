import WebApp from '@twa-dev/sdk'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'

interface FetchOptions extends RequestInit {
	data?: any
}

async function fetchWithTelegram(endpoint: string, options: FetchOptions = {}) {
	const { data, ...customOptions } = options

	const defaultOptions: RequestInit = {
		headers: {
			'Content-Type': 'application/json',
			'x-telegram-init-data': (WebApp as any).initData || ''
		},
		...customOptions
	}

	if (data) {
		defaultOptions.body = JSON.stringify(data)
	}

	const response = await fetch(`${API_URL}${endpoint}`, defaultOptions)

	if (!response.ok) {
		const error = await response.json().catch(() => ({}))
		throw new Error(error.message || 'Something went wrong')
	}

	return response.json()
}

export const api = {
	getProjects: () => fetchWithTelegram('/api/projects'),
	createProject: (data: any) => fetchWithTelegram('/api/projects', { method: 'POST', data }),
	updateProject: (id: string, data: any) =>
		fetchWithTelegram(`/api/projects/${id}`, { method: 'PUT', data }),
	deleteProject: (id: string) => fetchWithTelegram(`/api/projects/${id}`, { method: 'DELETE' }),

	getTasks: (projectId: string) => fetchWithTelegram(`/api/tasks?projectId=${projectId}`),
	createTask: (data: any) => fetchWithTelegram('/api/tasks', { method: 'POST', data }),
	updateTask: (id: string, data: any) =>
		fetchWithTelegram(`/api/tasks/${id}`, { method: 'PUT', data }),
	deleteTask: (id: string) => fetchWithTelegram(`/api/tasks/${id}`, { method: 'DELETE' }),
	toggleTask: (id: string) => fetchWithTelegram(`/api/tasks/${id}/toggle`, { method: 'PATCH' })
}
