export class User {
	id: number
	name: string
	email: string
	isAdmin: boolean

	constructor(data: any) {
		this.id	= data.id
		this.name	= data.name
		this.email	= data.email
		this.isAdmin	= data.is_admin
	}
}


