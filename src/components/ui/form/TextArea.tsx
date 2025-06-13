import cn from 'clsx'
import { type TextareaHTMLAttributes, useId } from 'react'

import type { IField } from '@/types/form.types'

import { FormField } from './FormField'

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement>, IField {}

export function TextArea({
	label,
	error,
	registration,
	fullWidth = true,
	className,
	id,
	...props
}: Props) {
	const generatedId = useId()
	const fieldId = id || generatedId

	return (
		<FormField
			label={label}
			error={error}
			fullWidth={fullWidth}
			id={fieldId}
		>
			<textarea
				className={cn(
					'input-textarea',
					error && 'input-error',
					fullWidth && 'input-full-width',
					className
				)}
				id={fieldId}
				{...registration}
				{...props}
			/>
		</FormField>
	)
}
