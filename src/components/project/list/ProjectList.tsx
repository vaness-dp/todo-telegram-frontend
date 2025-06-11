'use client'

import cn from 'clsx'
import * as m from 'framer-motion/m'

import { EmptyState } from '@/ui/EmptyState'
import { LoadingSkeleton } from '@/ui/LoadingSkeleton'

import type { IProject } from '@/types/api.types'
import type { MotionDivProps, MotionProps } from '@/types/motion.types'

import { ProjectListItem } from './ProjectListItem'
import { useFirstProjectLogic } from './useFirstProjectLogic'
import { staggerChildren } from '@/shared/animations'

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
	isLoading = false,
	...props
}: MotionProps<MotionDivProps> & Props) {
	const { isFirstProjectCreated } = useFirstProjectLogic(projects, isLoading)

	if (isLoading) {
		return (
			<LoadingSkeleton
				count={2}
				className="grid grid-cols-1 gap-4 sm:grid-cols-2"
				{...props}
			/>
		)
	}

	if (!projects?.length) {
		return (
			<EmptyState
				title="No projects"
				description="Create your first project"
			/>
		)
	}

	if (isFirstProjectCreated) {
		return (
			<div className={cn('grid grid-cols-1 gap-4 sm:grid-cols-2', className)}>
				{projects.map(project => (
					<ProjectListItem
						key={project._id}
						project={project}
						urlPattern={urlPattern}
						onProjectDelete={onProjectDelete}
						isStatic={true}
					/>
				))}
			</div>
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
				<ProjectListItem
					key={project._id}
					project={project}
					urlPattern={urlPattern}
					onProjectDelete={onProjectDelete}
					isStatic={false}
				/>
			))}
		</m.div>
	)
}
