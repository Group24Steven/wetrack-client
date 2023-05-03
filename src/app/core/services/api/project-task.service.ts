import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoint } from '../../enums/api-endpoint';
import { ProjectTask } from '../../models/project-task';

@Injectable({
  providedIn: 'root'
})
export class ProjectTaskService extends BaseApiService<ProjectTask>{

  constructor(private httpClient: HttpClient) {
    super(httpClient, ApiEndpoint.ProjectTasks)
   }
}
