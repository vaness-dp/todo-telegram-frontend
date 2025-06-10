'use client'

import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { ProjectList } from '@/components/project/list/ProjectList'

import { Button } from '@/ui/button/Button'

import { ROUTES } from '@/config/routes.config'

import { useDeleteProject, useProjects } from '@/hooks/useProjects'

export function ProjectsContent() {
	const router = useRouter()
	const { data: projects = [], isPending } = useProjects('65f5c5f6f5c5f6f5c5f6f5c5')
	const { mutate: deleteProject } = useDeleteProject()

	return (
		<div className="container mx-auto max-w-2xl px-4 py-8">
			<div className="mb-6 flex items-center justify-between">
				<h1 className="text-2xl font-bold">My projects</h1>
				<Link href={ROUTES.PROJECT_CREATE}>
					<Button variant="primary">
						<Plus className="mr-2 h-4 w-4" />
						Create a project
					</Button>
				</Link>
			</div>

			<ProjectList
				projects={projects}
				urlPattern={ROUTES.PROJECT('[id]')}
				onProjectDelete={id => {
					deleteProject(id, {
						onSuccess: () => router.push(ROUTES.PROJECTS)
					})
				}}
				isLoading={isPending}
			/>
		</div>
	)
}
