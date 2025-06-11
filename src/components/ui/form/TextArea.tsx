import cn from 'clsx'
import type { TextareaHTMLAttributes } from 'react'

import type { IField } from '@/types/form.types'

import { FormField } from './FormField'
import { getInputStyles } from '@/styles/form.styles'

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
				className={getInputStyles({
					error,
					fullWidth,
					className: cn('min-h-[96px] px-4 py-2 resize-none', className)
				})}
				{...registration}
				{...props}
			/>
		</FormField>
	)
}
