export class TimeRecord {
  constructor(
    public durationSeconds: number,
    public description: string,
    public taskId?: string,
    public projectId?: string,
    public ticketId?: string,
    public projectTaskId?: string,
    public task?: {
      'id': string,
      'name': string,
      'description': string
    },
    startDate?: number,
    createdDate?: number,
    lastModifiedDate?: number,
    public id?: string,
  ) { }
}
