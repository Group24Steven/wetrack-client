import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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
    return this.httpClient.post<LoginResponse>(environment.apiUrl + '/login', { email: email, password: password }).pipe(
      tap((response: any) => {
        this.handleLoginResponse(response)
      })
    )
  }

  logout(): Observable<any> {
    return this.httpClient.post(environment.apiUrl + '/logout', {}).pipe(
      tap(() => {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user')
      })
    )
  }

  forgotPassword(email: string): Observable<any> {
    return this.httpClient.post(environment.apiUrl + '/password/forgot', { email: email })
  }

  resetPassword(email: string, password: string, token: string,): Observable<any> {
    return this.httpClient.post(environment.apiUrl + '/password/reset', {
      email: email,
      password: password,
      password_confirmation: password,
      token: token,
    }).pipe(
      tap((response: any) => {
        this.handleLoginResponse(response)
      })
    )
  }

  getUser(): Observable<User> {
    return this.httpClient.get(environment.apiUrl + '/user').pipe(
      map((response: any) => {
        return new User(response.data)
      }),
      tap((user: User) => {
        this.setCurrentUser(user)
      })
    )
  }

  private setAuthToken(token: string): void {
    localStorage.setItem('auth_token', token)
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token')
  }

  public setCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  public getCurrentUser(): User {
    const user = localStorage.getItem('currentUser')
    return user ? JSON.parse(user) : null
  }

  public static getAuthToken(): string | null {
    return localStorage.getItem('auth_token')
  }

  private handleLoginResponse(response: any): void {
    if (!response.data) return
    const data = response.data

    this.setAuthToken(data.auth_token)
    const user = new User(data.user)
    this.setCurrentUser(user)
  }
}
