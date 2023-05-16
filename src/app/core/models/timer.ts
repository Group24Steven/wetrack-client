export class Timer {
  id: number
  startTime: number
  endTime: number
  createdAt: Date
  updatedAt: Date

  constructor(data: TimerData) {
    this.startTime = new Date(data.start_time).getTime()
    this.endTime = new Date(data.end_time).getTime()
    this.createdAt = new Date(data.created_at)
    this.updatedAt = new Date(data.updated_at)
  }
}

interface TimerData {
  id: number,
  user_id: number, 
  start_time: string
  end_time: string,
  created_at: string,
  updated_at: string
}