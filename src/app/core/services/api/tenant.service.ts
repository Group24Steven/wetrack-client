import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { ApiEndpoint } from '../../enums/api-endpoint';
import { Tenant } from '../../models/tenant';

@Injectable({
  providedIn: 'root'
})
export class TenantService extends BaseApiService<Tenant> {

  constructor(private httpClient: HttpClient) {
    super(httpClient, ApiEndpoint.Tenants)
  }
}
