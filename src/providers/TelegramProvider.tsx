'use client'

import { type ReactNode, createContext, useContext, useEffect, useState } from 'react'

interface IWebAppUser {
	id: number
	first_name: string
	last_name?: string
	username?: string
	language_code?: string
}

interface ITelegramContext {
	user: IWebAppUser | null
	initData: string
}

interface IWebApp {
	initDataUnsafe?: {
		user: IWebAppUser
	}
	initData?: string
	ready: () => void
	setHeaderColor: (color: string) => void
	setBackgroundColor: (color: string) => void
	expand: () => void
	BackButton: {
		show: () => void
		hide: () => void
	}
}

const TelegramContext = createContext<ITelegramContext>({
	user: null,
	initData: ''
})

export const useTelegram = () => useContext(TelegramContext)

interface Props {
	children: ReactNode
}

export function TelegramProvider({ children }: Props) {
	const [webApp, setWebApp] = useState<IWebApp | null>(null)

	useEffect(() => {
		if (typeof window === 'undefined') return

		const initWebApp = async () => {
			const WebApp = (await import('@twa-dev/sdk')).default
			setWebApp(WebApp as IWebApp)
		}

		initWebApp()
	}, [])

	useEffect(() => {
		if (!webApp) return

		webApp.ready()
		webApp.setHeaderColor('secondary_bg_color')
		webApp.setBackgroundColor('bg_color')
		webApp.expand()

		const handleUrlChange = () => {
			if (window.location.pathname !== '/') {
				webApp.BackButton.show()
			} else {
				webApp.BackButton.hide()
			}
		}

		window.addEventListener('popstate', handleUrlChange)
		handleUrlChange()

		return () => {
			window.removeEventListener('popstate', handleUrlChange)
		}
	}, [webApp])

	const contextValue = {
		user: webApp?.initDataUnsafe?.user || null,
		initData: webApp?.initData || ''
	}

	return <TelegramContext.Provider value={contextValue}>{children}</TelegramContext.Provider>
}
