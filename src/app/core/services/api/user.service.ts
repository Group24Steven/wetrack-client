import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndpoint } from '../../enums/api-endpoint';
import { BaseApiService, RequestPaginator, RequestSearchParams } from './base-api.service';
import { User } from '../../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseApiService<User> {

  constructor(private httpClient: HttpClient) {
    super(httpClient, ApiEndpoint.Users);
  }
}
