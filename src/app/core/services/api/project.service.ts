import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from './resource-api-service.service';
import { ApiEndpoint } from '../../enums/api-endpoint';
import { Project } from '../../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends BaseApiService<Project> {

  constructor(private httpClient: HttpClient) {
    super(httpClient, ApiEndpoint.Projects)
  }
}
