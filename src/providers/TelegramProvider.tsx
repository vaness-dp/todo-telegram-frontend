import WebApp from '@twa-dev/sdk'
import { type ReactNode, createContext, useContext, useEffect } from 'react'

interface WebAppUser {
	id: number
	first_name: string
	last_name?: string
	username?: string
	language_code?: string
}

interface TelegramContextType {
	user: WebAppUser | null
	initData: string
}

const TelegramContext = createContext<TelegramContextType>({
	user: null,
	initData: ''
})

export const useTelegram = () => useContext(TelegramContext)

interface Props {
	children: ReactNode
}

export function TelegramProvider({ children }: Props) {
	useEffect(() => {
		WebApp.ready()

		WebApp.setHeaderColor('secondary_bg_color')
		WebApp.setBackgroundColor('bg_color')

		WebApp.expand()

		const handleUrlChange = () => {
			if (window.location.pathname !== '/') {
				WebApp.BackButton.show()
			} else {
				WebApp.BackButton.hide()
			}
		}

		window.addEventListener('popstate', handleUrlChange)
		handleUrlChange()

		return () => {
			window.removeEventListener('popstate', handleUrlChange)
		}
	}, [])

	const contextValue = {
		user: (WebApp as any).initDataUnsafe?.user || null,
		initData: (WebApp as any).initData || ''
	}

	return <TelegramContext.Provider value={contextValue}>{children}</TelegramContext.Provider>
}
