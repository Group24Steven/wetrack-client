import { Injectable } from '@angular/core';
import { BaseApiService } from './resource-api-service.service';
import { ProjectTask } from '../models/project-task';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoint } from '../enums/api-endpoint';

@Injectable({
  providedIn: 'root'
})
export class ProjectTaskService extends BaseApiService<ProjectTask>{

  constructor(private httpClient: HttpClient) {
    super(httpClient, ApiEndpoint.ProjectTasks)
   }
}
