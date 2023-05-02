import { Injectable } from '@angular/core';
import { BaseApiService } from './resource-api-service.service';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoint } from '../../enums/api-endpoint';
import { Task } from '../../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService extends BaseApiService<Task> {

  constructor(private httpClient: HttpClient) {
    super(httpClient, ApiEndpoint.Tasks);
  }
}
