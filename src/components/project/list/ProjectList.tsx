'use client'

import cn from 'clsx'
import * as m from 'framer-motion/m'
import { ListTodo } from 'lucide-react'
import Link from 'next/link'
import type { MouseEvent } from 'react'

import type { IProject } from '@/types/api.types'
import type { MotionDivProps, MotionProps } from '@/types/motion.types'

import { ProjectCard } from './ProjectCard'
import { fadeIn, scale, staggerChildren } from '@/shared/animations'

interface Props {
	projects: IProject[]
	onProjectDelete?: (id: string) => void
	urlPattern: string
	isLoading?: boolean
	className?: string
}

export function ProjectList({
	projects,
	onProjectDelete,
	urlPattern,
	className,
	isLoading,
	...props
}: MotionProps<MotionDivProps> & Props) {
	if (isLoading) {
		return (
			<m.div
				className={cn('grid grid-cols-1 gap-4 sm:grid-cols-2', className)}
				{...props}
				variants={staggerChildren}
				initial="initial"
				animate="animate"
				exit="exit"
			>
				{[1, 2].map(i => (
					<m.div
						key={i}
						variants={fadeIn}
						transition={{ duration: 0.3 }}
						className="h-[120px] rounded-2xl bg-bg-secondary/50 p-4"
					/>
				))}
			</m.div>
		)
	}

	if (!projects?.length) {
		return (
			<m.div
				variants={scale}
				initial="initial"
				animate="animate"
				exit="exit"
				transition={{ duration: 0.4 }}
				className="flex flex-col items-center justify-center py-8 text-center"
			>
				<m.div variants={fadeIn}>
					<ListTodo className="mb-4 h-12 w-12 text-text-secondary" />
					<h3 className="text-lg font-semibold text-text-primary">No projects</h3>
					<p className="mt-1 text-sm text-text-secondary">Create your first project</p>
				</m.div>
			</m.div>
		)
	}

	return (
		<m.div
			className={cn('grid grid-cols-1 gap-4 sm:grid-cols-2', className)}
			{...props}
			variants={staggerChildren}
			initial="initial"
			animate="animate"
			exit="exit"
		>
			{projects.map(project => (
				<m.div
					key={project._id}
					variants={fadeIn}
				>
					<Link href={urlPattern.replace('[id]', project._id)}>
						<ProjectCard
							title={project.name}
							description={project.description}
							tasksCount={
								project.tasksCount || {
									total: project.tasks?.length || 0,
									completed: project.tasks?.filter(task => task.completed).length || 0
								}
							}
							onDelete={
								onProjectDelete
									? (e: MouseEvent) => {
											e.preventDefault()
											onProjectDelete(project._id)
										}
									: undefined
							}
							className="cursor-pointer"
						/>
					</Link>
				</m.div>
			))}
		</m.div>
	)
}
