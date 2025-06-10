import type { Metadata, Viewport } from 'next'
import { SUSE } from 'next/font/google'

import { Providers } from '@/providers/Providers'

import './globals.css'

const suse = SUSE({
	variable: '--font-suse',
	subsets: ['latin']
})

export const metadata: Metadata = {
	title: 'Todo Telegram App',
	description: 'Organize your tasks and projects efficiently'
}

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
	userScalable: false
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={suse.variable}>
				<Providers>
					<main className="min-h-screen bg-bg-primary text-text-primary">{children}</main>
				</Providers>
			</body>
		</html>
	)
}
