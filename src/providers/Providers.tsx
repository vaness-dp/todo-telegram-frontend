'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { LazyMotion, domAnimation } from 'framer-motion'
import { type ReactNode, useState } from 'react'

interface Props {
	children: ReactNode
}

export function Providers({ children }: Props) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false,
						staleTime: 0,
						retry: 1
					},
					mutations: {
						retry: 1
					}
				}
			})
	)

	return (
		<QueryClientProvider client={queryClient}>
			<LazyMotion features={domAnimation}>{children}</LazyMotion>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}
