import cn from 'clsx'

export const CARD_STYLES = cn(
	'relative rounded-2xl p-4',
	'transition-all duration-[var(--transition-fast)]',
	'bg-bg-secondary border border-[color-mix(in_oklab,var(--color-accent-primary)_20%,transparent)]',
	'hover:border-[color-mix(in_oklab,var(--color-accent-primary)_30%,transparent)]'
)
