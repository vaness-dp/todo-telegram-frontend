'use client'

import * as m from 'framer-motion/m'
import Link from 'next/link'
import type { MouseEvent } from 'react'

import type { IProject } from '@/types/api.types'

import { ProjectCard } from './card/ProjectCard'
import { StaticProjectCard } from './card/StaticProjectCard'
import { fadeIn } from '@/shared/animations'

interface Props {
	project: IProject
	urlPattern: string
	onProjectDelete?: (id: string) => void
	isStatic?: boolean
}

export function ProjectListItem({ project, urlPattern, onProjectDelete, isStatic = false }: Props) {
	const handleDelete = onProjectDelete
		? (e: MouseEvent) => {
				e.preventDefault()
				onProjectDelete(project._id)
			}
		: undefined

	const tasksCount = project.tasksCount || {
		total: project.tasks?.length || 0,
		completed: project.tasks?.filter(task => task.completed).length || 0
	}

	const cardProps = {
		title: project.name,
		description: project.description,
		tasksCount,
		onDelete: handleDelete,
		className: 'cursor-pointer' as const
	}

	if (isStatic) {
		return (
			<div>
				<Link href={urlPattern.replace('[id]', project._id)}>
					<StaticProjectCard {...cardProps} />
				</Link>
			</div>
		)
	}

	return (
		<m.div variants={fadeIn}>
			<Link href={urlPattern.replace('[id]', project._id)}>
				<ProjectCard {...cardProps} />
			</Link>
		</m.div>
	)
}
