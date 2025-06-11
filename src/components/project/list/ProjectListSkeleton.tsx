'use client'

import cn from 'clsx'
import * as m from 'framer-motion/m'

import type { MotionDivProps, MotionProps } from '@/types/motion.types'

import { fadeIn, staggerChildren } from '@/shared/animations'

interface ProjectListSkeletonProps {
	className?: string
}

export function ProjectListSkeleton({
	className,
	...props
}: MotionProps<MotionDivProps> & ProjectListSkeletonProps) {
	return (
		<m.div
			className={cn('grid grid-cols-1 gap-4 sm:grid-cols-2', className)}
			{...props}
			variants={staggerChildren}
			initial="initial"
			animate="animate"
			exit="exit"
		>
			{[1, 2].map(i => (
				<m.div
					key={i}
					variants={fadeIn}
					transition={{ duration: 0.3 }}
					className="h-[120px] rounded-2xl bg-bg-secondary/50 p-4"
				/>
			))}
		</m.div>
	)
}
