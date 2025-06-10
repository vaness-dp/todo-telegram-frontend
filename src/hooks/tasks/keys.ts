export const taskKeys = {
	all: ['tasks'] as const,
	lists: () => [...taskKeys.all, 'list'] as const,
	list: (projectId: string) => [...taskKeys.lists(), { projectId }] as const,
	details: () => [...taskKeys.all, 'detail'] as const,
	detail: (id: string) => [...taskKeys.details(), id] as const
}
