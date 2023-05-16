import { Tenant } from "./tenant"

export class User {
	id: number
	name: string
	email: string
	isAdmin: boolean
	activeTenant?: Tenant

	constructor(data: any) {
		this.id	= data.id
		this.name	= data.name
		this.email	= data.email
		this.isAdmin	= data.is_admin
		this.activeTenant	= data.active_tenant
	}
}


