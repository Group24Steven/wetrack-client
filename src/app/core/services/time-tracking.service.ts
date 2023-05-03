import { Injectable } from '@angular/core';
import { TaskType } from '../enums/task-type';
import { TaskService } from './api/task.service';
import { ProjectService } from './api/project.service';
import { TicketService } from './api/ticket.service';

@Injectable({
  providedIn: 'root'
})
export class TimeTrackingService {

  type: TaskType = TaskType.Task
  constructor(private $taskService: TaskService, private projectService: ProjectService, private ticketService: TicketService) {}

}
