import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'

interface BackLinkProps {
	href: string
	children: ReactNode
	className?: string
}

export function BackLink({ href, children, className = '' }: BackLinkProps) {
	return (
		<Link
			href={href}
			className={`inline-flex items-center gap-2 text-text-secondary hover:text-text-primary ${className}`}
		>
			<ArrowLeft className="h-5 w-5" />
			<span className="text-sm">{children}</span>
		</Link>
	)
}
