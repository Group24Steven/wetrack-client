import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppEventService {
  private _tenantChanged = new Subject<void>()
  tenantChanged$ = this._tenantChanged.asObservable()

  private _userUpdated = new Subject<void>()
  userUpdated$ = this._userUpdated.asObservable()

  // Weitere Ereignisse können hier hinzugefügt werden
  notifyTenantChanged() {
    this._tenantChanged.next()
  }

  notifyUserUpdated() {
    this._userUpdated.next()
  }

  constructor() { }
}
