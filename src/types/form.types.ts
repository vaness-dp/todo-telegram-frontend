import type { UseFormRegisterReturn } from 'react-hook-form'

export interface IField {
	label?: string
	error?: string
	registration?: UseFormRegisterReturn
	fullWidth?: boolean
}
