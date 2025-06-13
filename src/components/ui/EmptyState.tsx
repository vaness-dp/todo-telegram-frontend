import cn from 'clsx'
import * as m from 'framer-motion/m'
import { ListTodo } from 'lucide-react'

import { fadeIn, scale } from '@/shared/animations'

interface Props {
	title: string
	description: string
	className?: string
}

export function EmptyState({ title, description, className }: Props) {
	return (
		<m.div
			variants={scale}
			initial="initial"
			animate="animate"
			exit="exit"
			transition={{ duration: 0.4 }}
			className={cn('flex flex-col items-center justify-center py-8 text-center', className)}
		>
			<m.div variants={fadeIn}>
				<ListTodo className="mb-4 h-12 w-12 text-text-secondary" />
				<h2 className="text-lg font-semibold text-text-primary">{title}</h2>
				<p className="mt-1 text-sm text-text-secondary">{description}</p>
			</m.div>
		</m.div>
	)
}
