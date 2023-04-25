import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export abstract class BaseApiService<T> {
  protected abstract baseUrl: string;

  constructor(protected http: HttpClient) {}

  index(): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl);
  }

  show(id: number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${id}`);
  }

  store(data: T): Observable<T> {
    return this.http.post<T>(this.baseUrl, data);
  }

  update(id: number, data: T): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}