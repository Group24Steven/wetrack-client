import { Injectable } from '@angular/core';
import { Ticket } from '../../models/ticket';
import { BaseApiService } from './base-api.service';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoint } from '../../enums/api-endpoint';

@Injectable({
  providedIn: 'root'
})
export class TicketService extends BaseApiService<Ticket> {

  constructor(private httpClient: HttpClient) {
    super(httpClient, ApiEndpoint.Tickets);
  }
}
