import type { CreateAxiosDefaults } from 'axios'
import axios from 'axios'
import { Agent as HttpAgent } from 'http'
import { Agent as HttpsAgent } from 'https'

import { API_URL } from '@/constants/constants'

const options: CreateAxiosDefaults = {
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json'
	},
	timeout: 10000, // 10 секунд таймаут
	timeoutErrorMessage: 'Request timeout',
	httpAgent: new HttpAgent({ keepAlive: true }),
	httpsAgent: new HttpsAgent({ keepAlive: true })
}

export const axiosClassic = axios.create(options)
