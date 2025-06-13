'use client'

import cn from 'clsx'
import * as m from 'framer-motion/m'
import { Check, X } from 'lucide-react'

import { Priority } from '@/types/api.types'
import type { MotionDivProps, MotionProps } from '@/types/motion.types'

import { scale } from '@/shared/animations'

interface Props {
	title: string
	priority: Priority
	completed: boolean
	onToggle?: () => void
	onDelete?: () => void
	className?: string
}

export function TaskCard({
	title,
	priority,
	completed,
	onToggle,
	onDelete,
	className,
	...props
}: MotionProps<MotionDivProps> & Props) {
	return (
		<m.div
			className={cn('card-base', className)}
			{...props}
			variants={scale}
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
		>
			<div className="flex items-start justify-between gap-2">
				<div className="flex items-start gap-2">
					<m.button
						onClick={onToggle}
						className={cn(
							'mt-1 h-4 w-4 rounded-full border transition-colors',
							completed
								? 'border-priority-high bg-priority-high'
								: 'border-text-secondary hover:border-priority-high'
						)}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						aria-label="Mark task as completed"
					>
						{completed && <Check className="h-3 w-3 text-white" />}
					</m.button>

					<div>
						<m.h3
							className={cn(
								'text-lg font-semibold',
								completed ? 'text-text-secondary line-through' : 'text-text-primary'
							)}
							layout
						>
							{title}
						</m.h3>

						<m.div
							className="mt-1 flex items-center gap-2"
							layout
						>
							<span
								className={cn(
									'inline-block h-2 w-2 rounded-full',
									priority === Priority.HIGH
										? 'bg-priority-high'
										: priority === Priority.MEDIUM
											? 'bg-priority-medium'
											: 'bg-priority-low'
								)}
							/>
							<span className="text-sm text-text-secondary capitalize">{priority}</span>
						</m.div>
					</div>
				</div>

				{onDelete && (
					<m.button
						onClick={onDelete}
						className="text-text-secondary transition-colors hover:text-priority-high"
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						aria-label="Close"
					>
						<X className="h-5 w-5" />
					</m.button>
				)}
			</div>
		</m.div>
	)
}
