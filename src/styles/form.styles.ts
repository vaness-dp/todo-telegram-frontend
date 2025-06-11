import cn from 'clsx'

export const inputBaseStyles = [
	'rounded-[var(--radius-md)] bg-bg-secondary text-text-primary',
	'outline-none transition-all duration-[var(--transition-fast)]',
	'border border-[color-mix(in_oklab,var(--color-accent-primary)_20%,transparent)]',
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
}) => [...inputBaseStyles, error && 'border-priority-high', fullWidth && 'w-full', className]

export const getSelectStyles = ({
	error,
	fullWidth,
	className
}: {
	error?: string
	fullWidth?: boolean
	className?: string
}) =>
	cn(getInputStyles({ error, fullWidth }), 'flex items-center justify-between px-3 py-2', className)

export const SELECT_CONTENT_STYLES = cn(
	'z-50 overflow-hidden rounded-xl bg-[#1F1F1F] p-1',
	'shadow-[0_0_20px_5px_rgba(0,0,0,0.3)]'
)

export const SELECT_ITEM_STYLES = cn(
	'relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2 text-sm outline-none',
	'text-text-primary transition-colors',
	'hover:bg-[rgba(255,255,255,0.1)] focus:bg-[rgba(255,255,255,0.1)]',
	'data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
)
