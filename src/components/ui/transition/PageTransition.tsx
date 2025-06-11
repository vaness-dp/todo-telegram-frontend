import * as m from 'framer-motion/m'
import type { ReactNode } from 'react'

import type { MotionDivProps, MotionProps } from '@/types/motion.types'

import { pageTransition } from '@/shared/animations'

interface Props {
	children: ReactNode
	className?: string
}

export function PageTransition({
	children,
	className,
	...props
}: MotionProps<MotionDivProps> & Props) {
	return (
		<m.div
			className={className}
			{...props}
			initial="initial"
			animate="animate"
			exit="exit"
			variants={pageTransition}
		>
			{children}
		</m.div>
	)
}
