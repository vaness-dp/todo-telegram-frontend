'use client'

import * as m from 'framer-motion/m'
import { X } from 'lucide-react'
import type { MouseEvent, ReactNode } from 'react'
import { useEffect } from 'react'

import { Button } from '../button/Button'

import { fadeIn, modalContent, modalOverlay } from '@/shared/animations'

interface Props {
	isOpen: boolean
	onClose: () => void
	title: string
	children: ReactNode
}

export function Modal({ isOpen, onClose, title, children }: Props) {
	useEffect(() => {
		if (!isOpen) return

		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose()
		}

		document.addEventListener('keydown', handleEscape)
		return () => document.removeEventListener('keydown', handleEscape)
	}, [isOpen, onClose])

	if (!isOpen) return null

	const handleBackdropClick = (e: MouseEvent) => {
		if (e.target === e.currentTarget) onClose()
	}

	return (
		<m.div
			className="fixed inset-0 flex items-center justify-center bg-black/50 z-10"
			onClick={handleBackdropClick}
			{...modalOverlay}
		>
			<m.div
				className="w-full max-w-75 rounded-2xl bg-bg-secondary p-6"
				{...modalContent}
			>
				<div className="mb-6 flex items-center justify-between">
					<m.h2
						className="text-lg font-medium text-text-primary"
						variants={fadeIn}
						initial="initial"
						animate="animate"
					>
						{title}
					</m.h2>
					<m.div
						variants={fadeIn}
						initial="initial"
						animate="animate"
					>
						<Button
							variant="ghost"
							size="icon"
							onClick={onClose}
							className="text-text-secondary hover:text-text-primary"
						>
							<X className="h-5 w-5" />
						</Button>
					</m.div>
				</div>

				<m.div
					className="space-y-6"
					variants={fadeIn}
					initial="initial"
					animate="animate"
				>
					{children}
				</m.div>
			</m.div>
		</m.div>
	)
}
