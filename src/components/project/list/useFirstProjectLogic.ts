import { useEffect, useRef } from 'react'

import type { IProject } from '@/types/api.types'

export const useFirstProjectLogic = (projects: IProject[], isLoading: boolean) => {
	const previousLengthRef = useRef<number>(0)
	const hasInitializedRef = useRef(false)

	useEffect(() => {
		if (!isLoading && !hasInitializedRef.current) {
			previousLengthRef.current = projects?.length || 0
			hasInitializedRef.current = true
		}
	}, [isLoading, projects?.length])

	const isFirstProjectCreated = previousLengthRef.current === 0 && projects.length === 1
	const shouldFadeInFirst = isFirstProjectCreated && hasInitializedRef.current

	return {
		isFirstProjectCreated,
		previousLength: previousLengthRef.current,
		shouldFadeInFirst
	}
}
