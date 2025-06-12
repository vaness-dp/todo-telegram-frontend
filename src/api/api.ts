import { API_URL } from '@/constants/constants'

interface RequestOptions {
	method?: string
	data?: Record<string, unknown>
}

async function fetchWithTelegram(endpoint: string, options: RequestOptions = {}) {
	const { method = 'GET', data } = options

	let initData = ''
	if (typeof window !== 'undefined') {
		const WebApp = (await import('@twa-dev/sdk')).default
		initData = (WebApp as { initData?: string }).initData || ''
	}

	const response = await fetch(API_URL + endpoint, {
		method,
		headers: {
			'Content-Type': 'application/json',
			'Telegram-Web-App-Init-Data': initData
		},
		...(data && { body: JSON.stringify(data) })
	})

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`)
	}

	return response.json()
}

export const api = {
	getProjects: () => fetchWithTelegram('/api/projects'),
	createProject: (data: Record<string, unknown>) =>
		fetchWithTelegram('/api/projects', { method: 'POST', data }),
	updateProject: (id: string, data: Record<string, unknown>) =>
		fetchWithTelegram(`/api/projects/${id}`, { method: 'PUT', data }),
	deleteProject: (id: string) => fetchWithTelegram(`/api/projects/${id}`, { method: 'DELETE' }),

	getTasks: (projectId: string) => fetchWithTelegram(`/api/tasks?projectId=${projectId}`),
	createTask: (data: Record<string, unknown>) =>
		fetchWithTelegram('/api/tasks', { method: 'POST', data }),
	updateTask: (id: string, data: Record<string, unknown>) =>
		fetchWithTelegram(`/api/tasks/${id}`, { method: 'PUT', data }),
	deleteTask: (id: string) => fetchWithTelegram(`/api/tasks/${id}`, { method: 'DELETE' }),
	toggleTask: (id: string) => fetchWithTelegram(`/api/tasks/${id}/toggle`, { method: 'PATCH' })
}
