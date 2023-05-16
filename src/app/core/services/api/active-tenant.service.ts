import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ActiveTenantService {

  constructor(private httpClient: HttpClient, private auth: AuthService) { }

  setActiveTenant(tenantId: number): Observable<any> {
    return this.httpClient.post<any>(environment.apiUrl + '/set-active-tenant', { tenant_id: tenantId }).pipe(
      map((response: any) => new User(response.data)),
      tap((user: User) => {
        this.auth.setCurrentUser(user)
      })
    )
  }
}
