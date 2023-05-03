import { Injectable } from '@angular/core';
import { TimeRecord } from '../../models/time-record';
import { BaseApiService } from './base-api.service';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoint } from '../../enums/api-endpoint';

@Injectable({
  providedIn: 'root'
})
export class TimeRecordService extends BaseApiService<TimeRecord> {

  constructor(private httpClient: HttpClient) {
    super(httpClient, ApiEndpoint.TimeRecords)
  }
}
