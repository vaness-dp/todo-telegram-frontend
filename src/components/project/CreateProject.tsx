'use client'

import { useForm } from 'react-hook-form'

import { Button } from '@/ui/button/Button'
import { Field } from '@/ui/form/Field'
import { TextArea } from '@/ui/form/TextArea'

import type { CreateProjectDto } from '@/types/api.types'

interface Props {
	onSubmit: (data: CreateProjectDto) => void
	onCancel?: () => void
	isLoading?: boolean
	userId: string
}

export function CreateProject({ onSubmit, onCancel, isLoading, userId }: Props) {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<CreateProjectDto>({
		defaultValues: {
			name: '',
			description: '',
			userId
		},
		mode: 'all'
	})

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="space-y-4"
			noValidate
		>
			<Field
				label="Name"
				error={errors.name?.message}
				{...register('name', {
					required: 'This field is required'
				})}
			/>

			<TextArea
				label="Description"
				error={errors.description?.message}
				{...register('description', {
					required: 'This field is required'
				})}
			/>

			<div className="flex justify-end gap-2">
				{onCancel && (
					<Button
						type="button"
						variant="ghost"
						onClick={onCancel}
					>
						Cancel
					</Button>
				)}
				<Button
					type="submit"
					variant="primary"
					isLoading={isLoading}
				>
					Create
				</Button>
			</div>
		</form>
	)
}
