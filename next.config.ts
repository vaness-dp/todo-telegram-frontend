import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	env: {
		TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN
	},
	async headers() {
		return [
			{
				source: '/:path*',
				headers: [
					{
						key: 'Content-Security-Policy',
						value:
							"default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://telegram.org https://*.telegram.org; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https://*.telegram.org; connect-src 'self' https://*.telegram.org wss://*.telegram.org;"
					}
				]
			}
		]
	}
}

export default nextConfig
