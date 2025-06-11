import cn from 'clsx'
import type { TextareaHTMLAttributes } from 'react'

import type { IField } from '@/types/form.types'

import { FormField } from './FormField'

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement>, IField {}

export function TextArea({
	label,
	error,
	registration,
	fullWidth = true,
	className,
	...props
}: Props) {
	return (
		<FormField
			label={label}
			error={error}
			fullWidth={fullWidth}
		>
			<textarea
				className={cn(
					'input-textarea',
					error && 'input-error',
					fullWidth && 'input-full-width',
					className
				)}
				{...registration}
				{...props}
			/>
		</FormField>
	)
}
