'use client'

import cn from 'clsx'
import * as m from 'framer-motion/m'
import { ListTodo } from 'lucide-react'

import type { ITask } from '@/types/api.types'
import type { MotionDivProps, MotionProps } from '@/types/motion.types'

import { TaskCard } from './TaskCard'
import { fadeIn, scale, staggerChildren } from '@/shared/animations'

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
			<m.div
				className={cn('space-y-4', className)}
				{...props}
				variants={staggerChildren}
				initial="initial"
				animate="animate"
				exit="exit"
			>
				{[1, 2, 3].map(i => (
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

	if (!tasks?.length) {
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
					<h3 className="text-lg font-semibold text-text-primary">No tasks</h3>
					<p className="mt-1 text-sm text-text-secondary">Create your first task</p>
				</m.div>
			</m.div>
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
