import type { Metadata, Viewport } from 'next'
import { SUSE } from 'next/font/google'
import Script from 'next/script'

import { Providers } from '@/providers/Providers'
import { TelegramProvider } from '@/providers/TelegramProvider'

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
	initialScale: 1
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<head>
				<Script
					src="https://telegram.org/js/telegram-web-app.js"
					strategy="beforeInteractive"
				/>
			</head>
			<body className={suse.variable}>
				<TelegramProvider>
					<Providers>
						<main className="min-h-screen bg-bg-primary text-text-primary">{children}</main>
					</Providers>
				</TelegramProvider>
			</body>
		</html>
	)
}
