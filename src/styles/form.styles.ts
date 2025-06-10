export const inputBaseStyles = [
	// Base styles
	'rounded-[var(--radius-md)] bg-bg-secondary text-text-primary',
	'outline-none transition-all duration-[var(--transition-fast)]',
	// Border
	'border border-[color-mix(in_oklab,var(--color-accent-primary)_20%,transparent)]',
	// States
	'hover:border-[color-mix(in_oklab,var(--color-accent-primary)_30%,transparent)]',
	'focus:border-[color-mix(in_oklab,var(--color-accent-primary)_50%,transparent)]'
] as const

export const getInputStyles = ({
	error,
	fullWidth,
	className
}: {
	error?: string
	fullWidth?: boolean
	className?: string
}) => [
	...inputBaseStyles,
	// Error state
	error && 'border-priority-high',
	// Width
	fullWidth && 'w-full',
	// Custom classes
	className
]
