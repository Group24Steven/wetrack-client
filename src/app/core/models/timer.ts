export class Timer {
  id: number
  isRunning: boolean
  createdAt: number
  updatedAt: number

  constructor(data: TimerData) {
    this.isRunning = data.is_running
    this.createdAt = new Date(data.created_at).getTime()
    this.updatedAt = new Date(data.updated_at).getTime()
  }
}

interface TimerData {
  id: number,
  user_id: number, 
  is_running: boolean,
  created_at: string,
  updated_at: string
}