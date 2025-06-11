'use client'

import cn from 'clsx'
import type { InputHTMLAttributes } from 'react'
import { useState } from 'react'

import type { IField } from '@/types/form.types'

import { FormField } from './FormField'
import { getInputStyles } from '@/styles/form.styles'

interface Props extends InputHTMLAttributes<HTMLInputElement>, IField {}

export function Field({
	label,
	error,
	registration,
	fullWidth = true,
	className,
	onFocus,
	onBlur,
	...props
}: Props) {
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
		>
			<input
				className={cn(
					getInputStyles({ error: !isFocused ? error : undefined, fullWidth, className }),
					'px-3 py-2'
				)}
				{...props}
				{...registration}
				onFocus={handleFocus}
				onBlur={handleBlur}
			/>
		</FormField>
	)
}
