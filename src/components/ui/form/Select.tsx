'use client'

import * as SelectPrimitive from '@radix-ui/react-select'
import cn from 'clsx'
import * as m from 'framer-motion/m'
import { ChevronDown } from 'lucide-react'
import type { ComponentPropsWithoutRef, ElementRef } from 'react'
import { forwardRef } from 'react'

import type { BaseFieldProps } from '@/types/form.types'

import { FormField } from './FormField'
import { dropdownContent, dropdownItem, rotateAnimation } from '@/shared/animations'

interface Props
	extends Omit<ComponentPropsWithoutRef<typeof SelectPrimitive.Root>, 'value' | 'onValueChange'>,
		BaseFieldProps {
	options: { value: string; label: string }[]
	placeholder?: string
	className?: string
	value?: string
	onChange?: (value: string) => void
}

export const Select = forwardRef<ElementRef<typeof SelectPrimitive.Trigger>, Props>(
	(
		{ label, error, fullWidth = true, className, placeholder, options, value, onChange, ...props },
		ref
	) => {
		return (
			<FormField
				label={label}
				error={error}
				fullWidth={fullWidth}
			>
				<SelectPrimitive.Root
					value={value}
					onValueChange={onChange}
					{...props}
				>
					<SelectPrimitive.Trigger
						ref={ref}
						className={cn(
							'w-full appearance-none rounded-lg border bg-bg-secondary px-3 py-2 text-text-primary outline-none transition-colors',
							'border-[color-mix(in_oklab,var(--color-accent-primary)_20%,transparent)]',
							'hover:border-[color-mix(in_oklab,var(--color-accent-primary)_30%,transparent)]',
							'focus:border-accent-primary',
							'flex items-center justify-between',
							error && 'border-priority-high',
							className
						)}
					>
						<SelectPrimitive.Value placeholder={placeholder} />
						<SelectPrimitive.Icon asChild>
							<m.div {...rotateAnimation(Boolean(props.open))}>
								<ChevronDown className="h-4 w-4 text-text-secondary" />
							</m.div>
						</SelectPrimitive.Icon>
					</SelectPrimitive.Trigger>

					<SelectPrimitive.Portal>
						<SelectPrimitive.Content
							className="z-50 overflow-hidden rounded-xl bg-[#1F1F1F] p-1 shadow-[0_0_20px_5px_rgba(0,0,0,0.3)]"
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
											className={cn(
												'relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2 text-sm outline-none',
												'text-text-primary transition-colors',
												'hover:bg-[rgba(255,255,255,0.1)] focus:bg-[rgba(255,255,255,0.1)]',
												'data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
											)}
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
)

Select.displayName = 'Select'
