import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndpoint } from '../../enums/api-endpoint';
import { BaseApiService } from './base-api.service';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseApiService<User> {

  constructor(private httpClient: HttpClient) {
    super(httpClient, ApiEndpoint.Users);
  }
}
