import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from './resource-api-service.service';
import { Tenant } from '../models/tenant';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TenantService extends BaseApiService<Tenant> {
  protected override baseUrl: string = environment.apiUrl

  constructor(private httpClient: HttpClient) {
    super(httpClient)
   }
}
