import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { ROUTES } from '@/config/routes.config'

import { useCreateProject } from '@/hooks/projects/useCreateProject'

import type { CreateProjectDto } from '@/types/api.types'

// TODO: Заменить на реальный ID пользователя из Telegram
const TEMP_USER_ID = '65f5c5f6f5c5f6f5c5f6f5c5'

const ERROR_MESSAGES = {
	CREATE_FAILED: 'Failed to create project. Please try again.'
} as const

export const useCreateProjectPage = () => {
	const router = useRouter()
	const { mutate: createProject, isPending } = useCreateProject()
	const [error, setError] = useState<string | null>(null)

	const handleSubmit = (data: CreateProjectDto) => {
		setError(null)
		createProject(data, {
			onSuccess: () => {
				router.push(ROUTES.PROJECTS)
			},
			onError: error => {
				console.error('Failed to create project:', error)
				setError(ERROR_MESSAGES.CREATE_FAILED)
			}
		})
	}

	return {
		handleSubmit,
		isLoading: isPending,
		error,
		userId: TEMP_USER_ID
	}
}
