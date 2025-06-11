import cn from 'clsx'
import * as m from 'framer-motion/m'

import type { MotionDivProps, MotionProps } from '@/types/motion.types'

import { fadeIn, staggerChildren } from '@/shared/animations'

interface LoadingSkeletonProps {
	count?: number
	className?: string
	itemClassName?: string
}

export function LoadingSkeleton({
	count = 2,
	className,
	itemClassName,
	...props
}: MotionProps<MotionDivProps> & LoadingSkeletonProps) {
	return (
		<m.div
			className={className}
			{...props}
			variants={staggerChildren}
			initial="initial"
			animate="animate"
			exit="exit"
		>
			{Array.from({ length: count }, (_, i) => (
				<m.div
					key={i}
					variants={fadeIn}
					transition={{ duration: 0.3 }}
					className={cn('rounded-2xl bg-bg-secondary/50 p-4', itemClassName)}
				/>
			))}
		</m.div>
	)
}
