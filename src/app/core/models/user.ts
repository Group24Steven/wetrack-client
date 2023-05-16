import { Tenant } from "./tenant"

export class User {
	id: number
	name: string
	email: string
	isAdmin: boolean
	activeTenantId?: number
	activeTenant?: Tenant

	constructor(data: any) {
		this.id = data.id
		this.name = data.name
		this.email = data.email
		this.isAdmin = data.is_admin
		this.activeTenantId = data.active_tenant_id

		if (data.active_tenant)
			this.activeTenant = data.active_tenant
	}
}


