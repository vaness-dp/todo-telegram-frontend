'use client'

import cn from 'clsx'
import * as m from 'framer-motion/m'

import { EmptyState } from '@/ui/EmptyState'
import { LoadingSkeleton } from '@/ui/LoadingSkeleton'

import type { ITask } from '@/types/api.types'
import type { MotionDivProps, MotionProps } from '@/types/motion.types'

import { TaskCard } from './TaskCard'
import { fadeIn, staggerChildren } from '@/shared/animations'

interface Props {
	tasks: ITask[]
	onTaskToggle?: (id: string) => void
	onTaskDelete?: (id: string) => void
	isLoading?: boolean
	className?: string
}

export function TaskList({
	tasks,
	onTaskToggle,
	onTaskDelete,
	className,
	isLoading,
	...props
}: MotionProps<MotionDivProps> & Props) {
	if (isLoading) {
		return (
			<LoadingSkeleton
				count={3}
				className="space-y-4"
				{...props}
			/>
		)
	}

	if (!tasks?.length) {
		return (
			<EmptyState
				title="No tasks"
				description="Create your first task"
			/>
		)
	}

	return (
		<m.div
			className={cn('space-y-4', className)}
			{...props}
			variants={staggerChildren}
			initial="initial"
			animate="animate"
			exit="exit"
		>
			{tasks.map(task => (
				<m.div
					key={task._id}
					variants={fadeIn}
				>
					<TaskCard
						title={task.title}
						priority={task.priority}
						completed={task.completed}
						onToggle={onTaskToggle ? () => onTaskToggle(task._id) : undefined}
						onDelete={onTaskDelete ? () => onTaskDelete(task._id) : undefined}
					/>
				</m.div>
			))}
		</m.div>
	)
}
