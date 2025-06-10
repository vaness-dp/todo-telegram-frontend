'use client'

import * as m from 'framer-motion/m'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import type { CreateProjectDto } from '@/types/api.types'

import { Button } from '../../ui/button/Button'
import { Field } from '../../ui/form/Field'
import { TextArea } from '../../ui/form/TextArea'

import { fadeIn } from '@/shared/animations'

interface Props {
	onSubmit: (data: CreateProjectDto) => void
	isLoading?: boolean
	userId: string
}

export function CreateProjectForm({ onSubmit, isLoading, userId }: Props) {
	const router = useRouter()
	const { register, handleSubmit, formState, setFocus } = useForm<CreateProjectDto>({
		defaultValues: {
			name: '',
			description: '',
			userId
		},
		mode: 'onSubmit'
	})

	useEffect(() => {
		setFocus('name')
	}, [setFocus])

	return (
		<m.form
			onSubmit={handleSubmit(onSubmit)}
			className="space-y-6"
			variants={fadeIn}
			initial="initial"
			animate="animate"
			exit="exit"
		>
			<div className="space-y-4">
				<Field
					label="Title"
					error={formState.errors.name?.message}
					{...register('name', {
						required: 'This field is required'
					})}
				/>

				<TextArea
					rows={4}
					label="Description"
					error={formState.errors.description?.message}
					{...register('description')}
				/>
			</div>

			<div className="flex justify-end gap-2">
				<Button
					type="button"
					variant="ghost"
					onClick={() => router.back()}
				>
					Cancel
				</Button>
				<Button
					type="submit"
					variant="primary"
					isLoading={isLoading}
				>
					Create
				</Button>
			</div>
		</m.form>
	)
}
