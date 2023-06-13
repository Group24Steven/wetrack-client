import { TimeRecordType } from "../enums/time-record-type"
import { Task } from "../models/task"

export interface TimeRecordConfig {
  id: string | null
  task: Task | null
  projectId: string | null
  startDateTime: number
  endDateTime: number 
  searchType: TimeRecordType | null
}
