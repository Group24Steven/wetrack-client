import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiEndpoint } from '../../enums/api-endpoint';

@Injectable({
  providedIn: 'root'
})
export class TimerCmdService {

  private url: string

  constructor(protected http: HttpClient) {
    this.url = `${environment.apiUrl}/${ApiEndpoint.Timers}`
  }

  get(): Observable<any> {
    return this.postCmd('get')
  }

  start(javascriptTs: number): Observable<any> {
    return this.postCmd('start', {
      start_time: Math.floor(javascriptTs / 1000),
    })
  }

  stop(javascriptTs: number): Observable<any> {
    return this.postCmd('stop', {
      end_time: Math.floor(javascriptTs / 1000),
    })
  }

  delete(): Observable<any> {
    return this.postCmd('delete')
  }

  private postCmd(endpoint: string, body: any = {}): Observable<any> {
    return this.http.post(`${this.url}/${endpoint}`, body)
  }
}
