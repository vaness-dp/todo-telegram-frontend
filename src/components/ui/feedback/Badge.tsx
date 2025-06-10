import cn from 'clsx'
import type { HTMLAttributes } from 'react'

import type { Priority } from '@/types/api.types'

interface Props extends HTMLAttributes<HTMLSpanElement> {
	priority: Priority
}

export function Badge({ priority, className, ...props }: Props) {
	return (
		<span
			className={cn(
				// Base styles
				'inline-flex items-center rounded-full px-2 py-0.5',
				'text-xs font-medium',
				// Priority variants
				{
					'bg-[color-mix(in_oklab,var(--color-priority-low)_15%,transparent)] text-priority-low':
						priority === 'low',
					'bg-[color-mix(in_oklab,var(--color-priority-medium)_15%,transparent)] text-priority-medium':
						priority === 'medium',
					'bg-[color-mix(in_oklab,var(--color-priority-high)_15%,transparent)] text-priority-high':
						priority === 'high'
				},
				className
			)}
			{...props}
		>
			{priority}
		</span>
	)
}
