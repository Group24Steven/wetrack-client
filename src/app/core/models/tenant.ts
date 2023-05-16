export class Tenant {
  id: number
  email: string
  weclappToken: string
  weclappUrl: string
  name: string
  config: any[]

  constructor(data: any) {
    this.id = data.id
    this.name = data.name
    this.email = data.email
    this.weclappToken = data.weclappToken
    this.weclappUrl = data.weclappUrl
    this.config = data.config
  }
}

