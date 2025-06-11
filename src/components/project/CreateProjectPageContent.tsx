'use client'

import * as m from 'framer-motion/m'

import { BackLink } from '@/ui/button/BackLink'

import { ROUTES } from '@/config/routes.config'

import { CreateProjectForm } from './form/CreateProjectForm'
import { useCreateProjectPage } from './useCreateProjectPage'
import { pageTransition } from '@/shared/animations'

export function CreateProjectPageContent() {
	const { handleSubmit, isLoading, error, userId } = useCreateProjectPage()

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
				isLoading={isLoading}
				userId={userId}
			/>
		</m.div>
	)
}
