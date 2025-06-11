'use client'

import { Button } from '@/ui/button/Button'
import { Field } from '@/ui/form/Field'
import { Select } from '@/ui/form/Select'

import type { CreateTaskDto } from '@/types/api.types'
import { Priority } from '@/types/api.types'

import { useCreateTaskForm } from './useCreateTaskForm'

const priorityOptions = [
	{ value: Priority.HIGH, label: 'High' },
	{ value: Priority.MEDIUM, label: 'Medium' },
	{ value: Priority.LOW, label: 'Low' }
]

interface Props {
	projectId: string
	onSubmit: (data: CreateTaskDto) => void
	onCancel?: () => void
	isLoading?: boolean
}

export function CreateTask({ projectId, onSubmit, onCancel, isLoading }: Props) {
	const { register, formState, control, handleFormSubmit, Controller } = useCreateTaskForm({
		projectId,
		onSubmit
	})

	return (
		<form
			onSubmit={handleFormSubmit}
			className="space-y-4"
		>
			<input
				type="hidden"
				{...register('projectId')}
			/>

			<Field
				label="Title"
				error={formState.errors.title?.message}
				{...register('title', {
					required: 'This field is required'
				})}
			/>

			<Controller
				name="priority"
				control={control}
				render={({ field }) => (
					<Select
						label="Priority"
						error={formState.errors.priority?.message}
						options={priorityOptions}
						placeholder="Select priority"
						value={field.value}
						onChange={field.onChange}
					/>
				)}
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
