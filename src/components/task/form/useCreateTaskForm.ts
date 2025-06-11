import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

import type { CreateTaskDto } from '@/types/api.types'
import { Priority } from '@/types/api.types'

interface Props {
	projectId: string
	onSubmit: (data: CreateTaskDto) => void
}

export function useCreateTaskForm({ projectId, onSubmit }: Props) {
	const form = useForm<CreateTaskDto>({
		defaultValues: {
			title: '',
			priority: Priority.MEDIUM,
			projectId
		},
		mode: 'onSubmit'
	})

	const { setFocus, handleSubmit } = form

	useEffect(() => {
		setFocus('title')
	}, [setFocus])

	const handleFormSubmit = handleSubmit(data => {
		onSubmit(data)
	})

	return {
		...form,
		handleFormSubmit,
		Controller
	}
}
