export class Timer {
  id: number
  startTime: number
  endTime: number | null
  createdAt: Date
  updatedAt: Date

  constructor(data: TimerData) {
    this.startTime = (data.start_time * 1000)
    this.endTime = data.end_time ? (data.end_time * 1000) : null
    this.createdAt = new Date(data.created_at)
    this.updatedAt = new Date(data.updated_at)
  }
}

interface TimerData {
  id: number,
  user_id: number,
  start_time: number
  end_time: number,
  created_at: string,
  updated_at: string
}