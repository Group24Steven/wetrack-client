import { Task } from "./task"

export class Customer {
  id: string
  customerNumber: string
  company: string
  tasks?: Task[]

  constructor(data: any) {
    this.id = data.id
    this.customerNumber = data.customerNumber
    this.company = data.company
    this.tasks = data.tasks
  }
}
