'use client'

import { type ReactNode, useState } from 'react'

import { useCreateTask } from '@/hooks/tasks/useCreateTask'

import { Modal } from '../../ui/feedback/Modal'

import { CreateTask } from './CreateTask'

interface Props {
	children: ReactNode
	projectId: string
}

export function CreateTaskDialog({ children, projectId }: Props) {
	const [isOpen, setIsOpen] = useState(false)
	const { mutate: createTask, isPending } = useCreateTask()

	return (
		<>
			<div
				role="button"
				onClick={() => setIsOpen(true)}
				className="cursor-pointer"
			>
				{children}
			</div>

			<Modal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				title="Create Task"
			>
				<CreateTask
					projectId={projectId}
					onSubmit={data => {
						setIsOpen(false)
						createTask(data)
					}}
					onCancel={() => setIsOpen(false)}
					isLoading={isPending}
				/>
			</Modal>
		</>
	)
}
