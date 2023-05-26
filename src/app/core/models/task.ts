import { ProjectPriority } from "../enums/project-priority";
import { ProjectStatus } from '../enums/project-status';

export class Task {
    id: string
    subject: string
    priority?: ProjectPriority
    status?: ProjectStatus
    lastModifiedDate: Date
    customerId?: string

    constructor(data: any) {
      this.id = data.id
      this.subject = data.subject
      this.status = data.taskStatus
      this.priority = data.taskPriority
      this.lastModifiedDate = this.lastModifiedDate
      this.customerId = data.customerId
    }
}
