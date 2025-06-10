import { ProjectDetails } from '@/components/project/details/ProjectDetails'

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
	const resolvedParams = await params
	return <ProjectDetails projectId={resolvedParams.id} />
}
