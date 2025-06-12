'use client'

import { Plus } from 'lucide-react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { LoadingSkeleton } from '@/ui/LoadingSkeleton'
import { Button } from '@/ui/button/Button'

import { ROUTES } from '@/config/routes.config'

import { useDeleteProject } from '@/hooks/projects/useDeleteProject'
import { useProjects } from '@/hooks/projects/useProjects'

const ProjectList = dynamic(
	() => import('@/components/project/list/ProjectList').then(m => m.ProjectList),
	{
		loading: () => (
			<LoadingSkeleton
				count={2}
				className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2"
			/>
		)
	}
)

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
				onProjectDelete={(id: string) => {
					deleteProject(id, {
						onSuccess: () => router.push(ROUTES.PROJECTS)
					})
				}}
				isLoading={isPending}
			/>
		</div>
	)
}
