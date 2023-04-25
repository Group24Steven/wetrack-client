import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AuthService } from './auth.service';

export class BaseApiService<T> {
  protected apiUrl: string = environment.apiUrl;
  private url: string;

  constructor(protected http: HttpClient, protected endpoint: string) {
    this.url = `${this.apiUrl}/${endpoint}`;
  }

  index(): Observable<T[]> {
    return this.http.get<T[]>(this.url, { headers: this.getHeaders() });
  }

  show(id: number): Observable<T> {
    return this.http.get<T>(`${this.url}/${id}`);
  }

  store(data: T): Observable<T> {
    return this.http.post<T>(this.url, data);
  }

  update(id: number, data: T): Observable<T> {
    return this.http.put<T>(`${this.url}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  private getHeaders(): HttpHeaders {
    const token = AuthService.getAuthToken()
    console.log(token)
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
}