import cn from 'clsx'

const inputBaseStyles =
	'rounded-md bg-bg-secondary text-text-primary outline-none transition-all duration-150 border border-accent-primary-20 hover:border-accent-primary-30 focus:border-accent-primary-50'

export const getInputStyles = ({
	error,
	fullWidth,
	className
}: {
	error?: string
	fullWidth?: boolean
	className?: string
}) => cn(inputBaseStyles, error && 'border-priority-high', fullWidth && 'w-full', className)

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
	'z-50 overflow-hidden rounded-xl bg-select-content p-1',
	'shadow-select'
)

export const SELECT_ITEM_STYLES = cn(
	'relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2 text-sm outline-none',
	'text-text-primary transition-colors duration-150',
	'hover:bg-select-item-hover focus:bg-select-item-hover',
	'data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
)
