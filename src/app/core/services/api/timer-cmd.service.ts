import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
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

  getTimer(): Observable<any> {
    return this.postCmd('get-timer')
  }

  start(): Observable<any> {
    return this.postCmd('start')
  }

  stop(): Observable<any> {
    return this.postCmd('stop')
  }

  delete(): Observable<any> {
    return this.postCmd('delete')
  }

  private postCmd(endpoint: string): Observable<any> {
    return this.http.post(`${this.url}/${endpoint}`, {}, { headers: this.getHeaders() })
  }

  private getHeaders(): HttpHeaders {
    const token = AuthService.getAuthToken()
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
}
