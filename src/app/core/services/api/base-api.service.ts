import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface RequestSearchParams {
  [key: string]: any;
}

export interface RequestPaginator {
  pageSize: number;
  pageIndex: number;
  total: number;
}

export class BaseApiService<T> {
  protected apiUrl: string = environment.apiUrl
  public url: string

  constructor(protected http: HttpClient, protected endpoint: string) {
    this.url = `${this.apiUrl}/${endpoint}`
  }

  index(filter?: RequestSearchParams, paginator?: RequestPaginator, searchTerm?: string): Observable<T[]> {
    let params = new HttpParams()

    if (paginator) {
      params = params.set('pageIndex', paginator.pageIndex.toString())
      params = params.set('pageSize', paginator.pageSize.toString())
    }
    if(searchTerm) {
      params = params.set('search', searchTerm)
    }
    
    for (const key in filter) {
      if (filter.hasOwnProperty(key)) {
        params = params.set(`filter[${key}]`, filter[key])
      }
    }

    return this.http.get<T[]>(this.url, { params: params })
  }

  show(id: number | string): Observable<T> {
    return this.http.get<T>(`${this.url}/${id}`)
  }

  store(data: any): Observable<T> {
    return this.http.post<T>(this.url, data)
  }

  update(id: number | string, data: T): Observable<T> {
    return this.http.put<T>(`${this.url}/${id}`, data)
  }

  delete(id: number | string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`)
  }
}