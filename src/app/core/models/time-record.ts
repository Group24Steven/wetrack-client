import { Task } from "./task";

export class TimeRecord {
  id: string
  durationSeconds: number
  description: string
  taskId: string
  userId: string
  task: Task
  startDate: Date
  startTime: string
  endTime: string
  billable: boolean

  constructor(data: any) {
    this.id = data.id
    this.durationSeconds = data.durationSeconds
    this.description = data.description

    const startDateUnixStamp = data.startDate
    this.startDate = new Date(startDateUnixStamp)
    this.startTime = TimeRecord.getTimeInput(this.startDate)

    const endDate = new Date(startDateUnixStamp + (this.durationSeconds * 1000))
    this.endTime = TimeRecord.getTimeInput(endDate)

    this.taskId = data.taskId
    this.userId = data.userId
    
    this.billable = data.billable

    this.task = data.task ?? null
  }

  public static getTimeInput(date: Date): string {
    let hours = date.getHours().toString().padStart(2, '0')
    let minutes = date.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
  }
}
