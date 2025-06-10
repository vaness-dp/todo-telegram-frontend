import type { UseFormRegisterReturn } from 'react-hook-form'

export interface BaseFieldProps {
	label?: string
	error?: string
	registration?: UseFormRegisterReturn
	fullWidth?: boolean
}
