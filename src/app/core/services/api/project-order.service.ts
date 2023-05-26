import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoint } from '../../enums/api-endpoint';
import { BaseApiService } from './base-api.service';
import { ProjectOrder } from '../../models/project-order';

@Injectable({
  providedIn: 'root'
})
export class ProjectOrderService extends BaseApiService<ProjectOrder>{

  constructor(private httpClient: HttpClient) {
    super(httpClient, ApiEndpoint.ProjectOrder)
   }
}