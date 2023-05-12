import { Task } from "./task";

export class TimeRecord {
  id: string
  durationSeconds: number
  description: string
  task: Task
  startDate: Date
  endDate: Date

  constructor(data: any) {
    this.id = data.id
    this.durationSeconds = data.durationSeconds
    this.description = data.description
    this.startDate = new Date(data.startDate)
    this.endDate = new Date(data.endDate)
    this.task = data.task
  }
}
