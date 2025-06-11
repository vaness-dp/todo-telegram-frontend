import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import type { CreateProjectDto } from '@/types/api.types'

interface UseCreateProjectFormProps {
	userId: string
	onSubmit: (data: CreateProjectDto) => void
}

export function useCreateProjectForm({ userId, onSubmit }: UseCreateProjectFormProps) {
	const form = useForm<CreateProjectDto>({
		defaultValues: {
			name: '',
			description: '',
			userId
		},
		mode: 'onSubmit'
	})

	const { setFocus, handleSubmit } = form

	useEffect(() => {
		setFocus('name')
	}, [setFocus])

	const handleFormSubmit = handleSubmit(data => {
		onSubmit(data)
	})

	return {
		...form,
		handleFormSubmit
	}
}
