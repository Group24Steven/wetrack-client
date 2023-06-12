import { TimeRecordType } from "../enums/time-record-type"

export interface TimeRecordConfig {
  id: string | null
  taskId: string | null
  projectId: string | null
  startDateTime: number
  endDateTime: number 
  searchType: TimeRecordType | null
}
