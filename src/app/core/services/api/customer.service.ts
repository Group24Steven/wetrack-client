import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoint } from '../../enums/api-endpoint';
import { BaseApiService } from './base-api.service';
import { Customer } from '../../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseApiService<Customer>{

  constructor(private httpClient: HttpClient) {
    super(httpClient, ApiEndpoint.Customers)
   }
}