'use client'

import { Plus } from 'lucide-react'

import { CreateTaskDialog } from '@/components/task/form/CreateTaskDialog'
import { TaskList } from '@/components/task/list/TaskList'

import { BackLink } from '@/ui/button/BackLink'
import { Button } from '@/ui/button/Button'

import { ROUTES } from '@/config/routes.config'

import { useProject } from '@/hooks/useProjects'
import { useDeleteTask, useGetTasks, useToggleTask } from '@/hooks/useTasks'

interface ProjectDetailsProps {
	projectId: string
}

export function ProjectDetails({ projectId }: ProjectDetailsProps) {
	const { data: project, isPending: isProjectPending } = useProject(projectId)
	const { data: tasks, isPending: isTasksPending } = useGetTasks(projectId)
	const { mutate: toggleTask } = useToggleTask()
	const { mutate: deleteTask } = useDeleteTask()

	const isPending = isProjectPending || isTasksPending

	if (isPending || !project) return null

	return (
		<div className="container mx-auto max-w-2xl px-4 py-8">
			<BackLink
				href={ROUTES.PROJECTS}
				className="mb-8"
			>
				To projects
			</BackLink>

			{/* Project info */}
			<div className="mb-12">
				<h1 className="text-2xl font-bold text-text-primary">{project.name}</h1>
				{project.description && (
					<p className="mt-2 text-sm text-text-secondary">{project.description}</p>
				)}
			</div>

			{/* Tasks section */}
			<div>
				<div className="mb-6 flex items-center justify-between">
					<h2 className="text-xl font-semibold text-text-primary">Tasks</h2>
					<CreateTaskDialog projectId={project._id}>
						<Button variant="primary">
							<Plus className="mr-2 h-4 w-4" />
							Create Task
						</Button>
					</CreateTaskDialog>
				</div>

				<TaskList
					tasks={tasks ?? []}
					onTaskToggle={id => toggleTask({ id, projectId })}
					onTaskDelete={id => deleteTask({ id, projectId })}
				/>
			</div>
		</div>
	)
}
