import { Tenant } from "./tenant"

export class User {
	id: number
	name: string
	email: string
	is_admin: boolean
	active_tenant_id?: number
	active_tenant?: Tenant

	constructor(data: any) {
		if (!data) return 
		this.id = data.id
		this.name = data.name
		this.email = data.email
		this.is_admin = data.is_admin
		this.active_tenant_id = data.active_tenant_id

		if (data.active_tenant)
			this.active_tenant = data.active_tenant
	}
}



