/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			colors: {
				'bg-primary': '#0d0b12',
				'bg-secondary': '#15131c',
				'bg-card': '#1a1721',

				'accent-primary': '#8b5cf6',
				'accent-secondary': '#7c3aed',
				'accent-hover': '#9f7afa',

				'accent-primary-10': 'rgba(139, 92, 246, 0.1)',
				'accent-primary-20': 'rgba(139, 92, 246, 0.2)',
				'accent-primary-30': 'rgba(139, 92, 246, 0.3)',
				'accent-primary-50': 'rgba(139, 92, 246, 0.5)',

				'priority-low': '#10b981',
				'priority-medium': '#f59e0b',
				'priority-high': '#ef4444',

				'text-primary': '#ffffff',
				'text-secondary': '#94a3b8',
				'text-tertiary': '#64748b',

				'select-content': '#1F1F1F',
				'select-item-hover': 'rgba(255, 255, 255, 0.1)'
			},
			borderColor: {
				'accent-primary-10': 'rgba(139, 92, 246, 0.1)',
				'accent-primary-20': 'rgba(139, 92, 246, 0.2)',
				'accent-primary-30': 'rgba(139, 92, 246, 0.3)',
				'accent-primary-50': 'rgba(139, 92, 246, 0.5)'
			},
			backgroundColor: {
				'accent-primary-10': 'rgba(139, 92, 246, 0.1)',
				'accent-primary-20': 'rgba(139, 92, 246, 0.2)',
				'accent-primary-30': 'rgba(139, 92, 246, 0.3)',
				'accent-primary-50': 'rgba(139, 92, 246, 0.5)',
				'select-item-hover': 'rgba(255, 255, 255, 0.1)'
			},
			backgroundImage: {
				'gradient-primary': 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
				'gradient-background': 'linear-gradient(180deg, #0d0b12 0%, #1a1721 100%)'
			},
			boxShadow: {
				sm: '0 2px 4px rgba(0, 0, 0, 0.3)',
				md: '0 4px 6px rgba(0, 0, 0, 0.4)',
				lg: '0 8px 16px rgba(0, 0, 0, 0.5)',
				card: '0 8px 32px rgba(0, 0, 0, 0.2)',
				select: '0 0 20px 5px rgba(0, 0, 0, 0.3)'
			},
			borderRadius: {
				xs: '0.25rem',
				sm: '0.5rem',
				md: '0.75rem',
				lg: '1rem',
				xl: '1.25rem',
				'2xl': '1.5rem'
			},
			transitionDuration: {
				150: '150ms',
				250: '250ms',
				350: '350ms'
			},
			fontFamily: {
				sans: ['var(--font-suse)', 'system-ui', 'sans-serif']
			}
		}
	},
	plugins: [
		function ({ addComponents }) {
			addComponents({
				'.input-base': {
					'@apply rounded-md bg-bg-secondary text-text-primary outline-none transition-all duration-150 border border-accent-primary-20 hover:border-accent-primary-30 focus:border-accent-primary-50':
						{}
				},
				'.input-field': {
					'@apply input-base px-3 py-2': {}
				},
				'.input-textarea': {
					'@apply input-base min-h-[96px] px-4 py-2 resize-none': {}
				},
				'.input-select': {
					'@apply input-base flex items-center justify-between px-3 py-2': {}
				},
				'.input-error': {
					'@apply border-priority-high': {}
				},
				'.input-full-width': {
					'@apply w-full': {}
				},

				'.select-content': {
					'@apply z-50 overflow-hidden rounded-xl bg-select-content p-1 shadow-select': {}
				},
				'.select-item': {
					'@apply relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2 text-sm outline-none text-text-primary transition-colors duration-150 hover:bg-select-item-hover focus:bg-select-item-hover data-[disabled]:pointer-events-none data-[disabled]:opacity-50':
						{}
				},

				'.card-base': {
					'@apply relative rounded-2xl p-4 transition-all duration-150 bg-bg-secondary border border-accent-primary-20 hover:border-accent-primary-30':
						{}
				}
			})
		}
	]
}
