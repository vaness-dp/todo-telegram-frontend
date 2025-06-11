'use client'

import * as SelectPrimitive from '@radix-ui/react-select'
import cn from 'clsx'
import * as m from 'framer-motion/m'
import { ChevronDown } from 'lucide-react'
import type { ComponentPropsWithoutRef } from 'react'
import { useState } from 'react'

import type { IField } from '@/types/form.types'

import { FormField } from './FormField'
import { dropdownContent, dropdownItem, rotateAnimation } from '@/shared/animations'

interface Props
	extends Omit<ComponentPropsWithoutRef<typeof SelectPrimitive.Root>, 'value' | 'onValueChange'>,
		IField {
	options: { value: string; label: string }[]
	placeholder?: string
	className?: string
	value?: string
	onChange?: (value: string) => void
	name?: string
	onBlur?: () => void
}

export function Select({
	label,
	error,
	fullWidth = true,
	className,
	placeholder,
	options,
	value,
	onChange,
	name,
	onBlur,
	...props
}: Props) {
	const [isOpen, setIsOpen] = useState(false)

	const handleOpenChange = (open: boolean) => {
		setIsOpen(open)
		if (!open && onBlur) {
			onBlur()
		}
	}

	return (
		<FormField
			label={label}
			error={error}
			fullWidth={fullWidth}
		>
			<SelectPrimitive.Root
				value={value}
				onValueChange={onChange}
				onOpenChange={handleOpenChange}
				name={name}
				{...props}
			>
				<SelectPrimitive.Trigger
					className={cn(
						'input-select',
						error && 'input-error',
						fullWidth && 'input-full-width',
						className
					)}
				>
					<SelectPrimitive.Value placeholder={placeholder} />
					<SelectPrimitive.Icon asChild>
						<m.div {...rotateAnimation(isOpen)}>
							<ChevronDown className="h-4 w-4 text-text-secondary" />
						</m.div>
					</SelectPrimitive.Icon>
				</SelectPrimitive.Trigger>

				<SelectPrimitive.Portal>
					<SelectPrimitive.Content
						className="select-content"
						position="popper"
						sideOffset={8}
						asChild
					>
						<m.div {...dropdownContent}>
							<SelectPrimitive.Viewport>
								{options.map((option, index) => (
									<SelectPrimitive.Item
										key={option.value}
										value={option.value}
										className="select-item"
										asChild
									>
										<m.div {...dropdownItem(index)}>
											<SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
										</m.div>
									</SelectPrimitive.Item>
								))}
							</SelectPrimitive.Viewport>
						</m.div>
					</SelectPrimitive.Content>
				</SelectPrimitive.Portal>
			</SelectPrimitive.Root>
		</FormField>
	)
}
