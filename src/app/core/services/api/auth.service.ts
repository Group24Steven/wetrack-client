import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user';

interface LoginResponse {
  auth_token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(environment.apiUrl + '/login', { 'email': email, 'password': password }).pipe(
      tap((response) => {
        this.setAuthToken(response.auth_token)
        this.setCurrentUser(response.user)
      })
    )
  }

  logout(): Observable<any> {
    const token = AuthService.getAuthToken()
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.httpClient.post(environment.apiUrl + '/logout', {}, { headers: headers }).pipe(
      tap(() => {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user')
      })
    )
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token')
  }

  private setAuthToken(token: string): void {
    localStorage.setItem('auth_token', token)
  }

  private setCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  public getCurrentUser(): User {
    const user = localStorage.getItem('currentUser')
    return user ? JSON.parse(user) : null
  }

  public static getAuthToken(): string | null {
    return localStorage.getItem('auth_token')
  }
}
