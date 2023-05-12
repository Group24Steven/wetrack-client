import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/api/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = AuthService.getAuthToken()

    let request = req;
    if (token) {
      request = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      })
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          localStorage.removeItem('auth_token')
          localStorage.removeItem('user')
          this.router.navigate(['/login']) // Navigiere zur Anmeldeseite
        }

        // Wenn es kein 401-Fehler ist, werfe ihn einfach erneut
        return throwError(() => error);
      })
    )
  }
}
