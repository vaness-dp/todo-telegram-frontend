'use client'

import cn from 'clsx'
import { Loader2 } from 'lucide-react'
import type { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'ghost'
	size?: 'default' | 'icon'
	isLoading?: boolean
}

export function Button({
	variant = 'ghost',
	size = 'default',
	isLoading,
	className,
	children,
	disabled,
	...props
}: Props) {
	return (
		<button
			className={cn(
				// Base styles
				'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors',
				// Sizes
				size === 'default' ? 'px-4 py-2' : 'p-2',
				// Variants
				variant === 'primary'
					? 'bg-accent-primary text-bg-primary hover:bg-[color-mix(in_oklab,var(--color-accent-primary)_90%,black)]'
					: 'text-text-primary hover:bg-[color-mix(in_oklab,var(--color-accent-primary)_10%,transparent)]',
				// Disabled state
				(disabled || isLoading) && 'pointer-events-none opacity-50',
				className
			)}
			disabled={disabled || isLoading}
			{...props}
		>
			{isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : children}
		</button>
	)
}
