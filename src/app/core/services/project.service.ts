import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from './resource-api-service.service';
import { Project } from '../models/project';
import { ApiEndpoint } from '../enums/api-endpoint';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends BaseApiService<Project> {

  constructor(private httpClient: HttpClient) {
    super(httpClient, ApiEndpoint.Projects)
  }
}
