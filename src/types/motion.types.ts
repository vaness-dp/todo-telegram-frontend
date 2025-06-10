import type { HTMLMotionProps } from 'framer-motion'

export type MotionDivProps = HTMLMotionProps<'div'>
export type MotionButtonProps = HTMLMotionProps<'button'>

export type MotionProps<T> = Omit<
	T,
	'style' | 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'dragControls'
>

export type DynamicProps = {
	[key: string]: unknown
}

export type WithMotionProps<T> = Omit<MotionDivProps, keyof T> & T
