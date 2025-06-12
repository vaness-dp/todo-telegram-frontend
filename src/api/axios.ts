import type { CreateAxiosDefaults } from 'axios'
import axios from 'axios'

import { API_URL } from '@/constants/constants'

const options: CreateAxiosDefaults = {
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json'
	},
	// Оптимизация запросов
	timeout: 10000, // 10 секунд таймаут
	timeoutErrorMessage: 'Request timeout',
	httpAgent: new (require('http').Agent)({ keepAlive: true }),
	httpsAgent: new (require('https').Agent)({ keepAlive: true })
}

export const axiosClassic = axios.create(options)
