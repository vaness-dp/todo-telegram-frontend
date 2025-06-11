'use client'

import cn from 'clsx'
import { X } from 'lucide-react'
import type { MouseEvent } from 'react'

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

export function StaticProjectCard({ title, description, tasksCount, onDelete, className }: Props) {
	return (
		<div
			className={cn(
				'relative rounded-2xl p-4',
				'transition-all duration-[var(--transition-fast)]',
				'bg-bg-secondary border border-[color-mix(in_oklab,var(--color-accent-primary)_20%,transparent)]',
				'hover:border-[color-mix(in_oklab,var(--color-accent-primary)_30%,transparent)]',
				'hover:scale-[1.02] active:scale-[0.98]',
				className
			)}
		>
			<div className="mb-2 flex items-start justify-between gap-2">
				<h3 className="text-lg font-semibold text-text-primary">{title}</h3>
				{onDelete && (
					<button
						onClick={onDelete}
						className="text-text-secondary transition-all hover:text-priority-high hover:scale-110 active:scale-90"
					>
						<X className="h-5 w-5" />
					</button>
				)}
			</div>

			{description && (
				<p className="mb-3 text-sm text-text-secondary line-clamp-2">{description}</p>
			)}

			<div className="flex items-center gap-2 text-sm text-text-secondary">
				{tasksCount.completed}/{tasksCount.total} tasks completed
			</div>
		</div>
	)
}
