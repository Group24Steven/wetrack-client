import { Injectable } from '@angular/core';
import { TaskService } from './api/task.service';
import { ProjectService } from './api/project.service';
import { TicketService } from './api/ticket.service';
import { TimeRecordType } from '../enums/time-record-type';
import { Observable } from 'rxjs';
import { TimeRecordService } from './api/time-record.service';

@Injectable({
  providedIn: 'root'
})
export class TimeTrackingService {

  constructor(private taskService: TaskService, private projectService: ProjectService, private ticketService: TicketService, private timeRecordService: TimeRecordService) { }

  public loadSearchOptions(type: TimeRecordType, search?: string): Observable<any> {
    if (type === TimeRecordType.Ticket) return this.ticketService.index()

    if (type === TimeRecordType.Project) return this.projectService.index()

    if (type === TimeRecordType.Customer) return this.projectService.index()

    return this.taskService.index()
  }

  public safe(type: TimeRecordType, weclappId: string, description: string, durationSeconds: number): Observable<any> {
    const data: any = {
      title: 'test',
      description: description,
      durationSeconds: durationSeconds,
      startDate: Date.now(),
    }

    if (type === TimeRecordType.Ticket)
      data.ticketId = weclappId


    if (type === TimeRecordType.Project)
      data.projectId = weclappId


    if (type === TimeRecordType.Task)
      data.taskId = weclappId


    if (type === TimeRecordType.Customer)
      data.customerId = weclappId


    return this.timeRecordService.store(data)
  }
}
