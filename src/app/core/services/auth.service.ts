import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { tap } from 'rxjs/operators';

interface LoginResponse {
  authToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string): Observable<LoginResponse> {

    return this.httpClient.post<LoginResponse>(environment.apiUrl + '/login', {
      'email': email,
      'password': password
    }).pipe(
      // Here, the tap operator takes a function that receives the res (response) object, 
      // and the setAuthToken method is called with the authToken property of the response object. 
      // This allows the authToken to be saved in the local storage as a side effect of the login method without affecting the data being emitted by the Observable.
      tap((res) => this.setAuthToken(res.authToken)) 
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  private setAuthToken(token: string): void {
    localStorage.setItem('authToken', token);
  }
}
