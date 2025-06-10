'use client'

import * as m from 'framer-motion/m'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { BackLink } from '@/ui/button/BackLink'

import { ROUTES } from '@/config/routes.config'

import { useCreateProject } from '@/hooks/useProjects'

import type { CreateProjectDto } from '@/types/api.types'

import { CreateProjectForm } from './form/CreateProjectForm'
import { pageTransition } from '@/shared/animations'

// TODO: Заменить на реальный ID пользователя из Telegram
const TEMP_USER_ID = '65f5c5f6f5c5f6f5c5f6f5c5'

export function CreateProjectPageContent() {
	const router = useRouter()
	const { mutate: createProject, isPending } = useCreateProject()
	const [error, setError] = useState<string | null>(null)

	const handleSubmit = (data: CreateProjectDto) => {
		setError(null)
		createProject(data, {
			onSuccess: () => router.push(ROUTES.PROJECTS),
			onError: error => {
				console.error('Failed to create project:', error)
				setError('Failed to create project. Please try again.')
			}
		})
	}

	return (
		<m.div
			className="container mx-auto max-w-2xl px-4 py-8"
			variants={pageTransition}
			initial="initial"
			animate="animate"
			exit="exit"
		>
			<BackLink
				href={ROUTES.PROJECTS}
				className="mb-8"
			>
				Back to projects
			</BackLink>

			<m.div className="mb-6">
				<m.h1 className="text-2xl font-bold text-text-primary">Create a project</m.h1>
				{error && <m.p className="mt-2 text-sm text-priority-high">{error}</m.p>}
			</m.div>

			<CreateProjectForm
				onSubmit={handleSubmit}
				isLoading={isPending}
				userId={TEMP_USER_ID}
			/>
		</m.div>
	)
}
