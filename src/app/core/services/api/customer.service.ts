import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoint } from '../../enums/api-endpoint';
import { ProjectTask } from '../../models/project-task';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseApiService<ProjectTask>{

  constructor(private httpClient: HttpClient) {
    super(httpClient, ApiEndpoint.ProjectTasks)
   }
}