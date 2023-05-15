import { Task } from "./task"

export class Ticket {
    id: string
    ticketNumber: string
    subject: string
    tasks?: Task[]
  
    constructor(data: any) {
      this.id = data.id
      this.ticketNumber = data.ticketNumber
      this.subject = data.subject
      this.tasks = data.tasks
    }
}
