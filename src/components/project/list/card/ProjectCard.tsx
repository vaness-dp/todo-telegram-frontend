'use client'

import cn from 'clsx'
import * as m from 'framer-motion/m'
import { X } from 'lucide-react'
import type { MouseEvent } from 'react'

import type { MotionDivProps, MotionProps } from '@/types/motion.types'

import { scale } from '@/shared/animations'

interface Props {
	title: string
	description?: string
	tasksCount: {
		total: number
		completed: number
	}
	onDelete?: (e: MouseEvent) => void
	className?: string
}

export function ProjectCard({
	title,
	description,
	tasksCount,
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
			<div className="mb-2 flex items-start justify-between gap-2">
				<m.h2
					className="text-lg font-semibold text-text-primary"
					layout
				>
					{title}
				</m.h2>
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

			{description && (
				<m.p
					className="mb-3 text-sm text-text-secondary line-clamp-2"
					layout
				>
					{description}
				</m.p>
			)}

			<m.div
				className="flex items-center gap-2 text-sm text-text-secondary"
				layout
			>
				{tasksCount.completed}/{tasksCount.total} tasks completed
			</m.div>
		</m.div>
	)
}
