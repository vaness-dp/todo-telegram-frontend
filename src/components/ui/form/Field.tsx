'use client'

import cn from 'clsx'
import type { InputHTMLAttributes } from 'react'
import { useId, useState } from 'react'

import type { IField } from '@/types/form.types'

import { FormField } from './FormField'

interface Props extends InputHTMLAttributes<HTMLInputElement>, IField {}

export const Field = ({
	label,
	error,
	registration,
	fullWidth = true,
	onFocus,
	onBlur,
	className,
	id,
	...props
}: Props) => {
	const generatedId = useId()
	const fieldId = id || generatedId

	const [isFocused, setIsFocused] = useState(false)

	const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
		setIsFocused(true)
		onFocus?.(e)
	}

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		setIsFocused(false)
		onBlur?.(e)
	}

	return (
		<FormField
			label={label}
			error={error}
			fullWidth={fullWidth}
			id={fieldId}
		>
			<input
				className={cn(
					'input-field',
					!isFocused && error && 'input-error',
					fullWidth && 'input-full-width',
					className
				)}
				id={fieldId}
				{...props}
				{...registration}
				onFocus={handleFocus}
				onBlur={handleBlur}
			/>
		</FormField>
	)
}
