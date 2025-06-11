export const fadeIn = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: 20 }
}

export const staggerChildren = {
	animate: {
		transition: {
			staggerChildren: 0.1
		}
	}
}

export const slideIn = {
	initial: { x: -20, opacity: 0 },
	animate: { x: 0, opacity: 1 },
	exit: { x: 20, opacity: 0 }
}

export const scale = {
	initial: { scale: 0.95, opacity: 0 },
	animate: { scale: 1, opacity: 1 },
	exit: { scale: 0.95, opacity: 0 }
}

export const defaultTransition = {
	type: 'spring',
	stiffness: 380,
	damping: 30
}

export const pageTransition = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -20 },
	transition: {
		type: 'spring',
		stiffness: 380,
		damping: 30
	}
}

export const modalOverlay = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 },
	transition: { duration: 0.2 }
}

export const modalContent = {
	initial: { scale: 0.95, opacity: 0, y: 10 },
	animate: { scale: 1, opacity: 1, y: 0 },
	exit: { scale: 0.95, opacity: 0, y: 10 },
	transition: { type: 'spring', duration: 0.3, bounce: 0.3 }
}

export const dropdownContent = {
	initial: { opacity: 0, y: -10, scale: 0.95 },
	animate: { opacity: 1, y: 0, scale: 1 },
	exit: { opacity: 0, y: 10, scale: 0.95 },
	transition: { type: 'spring', duration: 0.2, bounce: 0.3 }
}

export const dropdownItem = (index: number) => ({
	initial: { opacity: 0, x: -10 },
	animate: { opacity: 1, x: 0 },
	transition: { delay: index * 0.05 }
})

export const rotateAnimation = (isOpen: boolean) => ({
	animate: { rotate: isOpen ? 180 : 0 },
	transition: { duration: 0.2 }
})
