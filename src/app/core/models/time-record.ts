export class TimeRecord {
  constructor(
    public id: string,
    public durationSeconds: number,
    public description: string,
    public taskId: string,
    public task: {
      'id': string,
      'name': string,
      'description': string
    },
    startDate: number,
    createdDate: number,
    lastModifiedDate: number,
  ) { }
}
