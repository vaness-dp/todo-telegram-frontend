class Routes {
	HOME = '/'

	PROJECTS = '/projects'
	PROJECT_CREATE = `${this.PROJECTS}/create`

	PROJECT(id: string) {
		return `${this.PROJECTS}/${id}`
	}
}

export const ROUTES = new Routes()
