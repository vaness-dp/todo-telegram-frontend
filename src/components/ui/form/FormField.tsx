import cn from 'clsx'
import type { ReactNode } from 'react'

interface Props {
	label?: string
	error?: string
	fullWidth?: boolean
	children: ReactNode
}

export function FormField({ label, error, fullWidth = true, children }: Props) {
	return (
		<div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
			{label && <label className="text-sm font-medium text-text-secondary">{label}</label>}
			{children}
			{error && <p className="text-sm text-priority-high animate-fadeIn">{error}</p>}
		</div>
	)
}
