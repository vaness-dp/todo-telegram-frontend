export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || ''
export const API_URL = process.env.NEXT_PUBLIC_API_URL
	? `${process.env.NEXT_PUBLIC_API_URL}/api`
	: 'http://localhost:5001/api'
