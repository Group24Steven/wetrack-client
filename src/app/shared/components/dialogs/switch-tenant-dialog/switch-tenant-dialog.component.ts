import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { HeadlineTwoComponent } from "../../../ui/headline-two/headline-two.component";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProgressBarComponent } from 'src/app/shared/ui/progress-bar/progress-bar.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { Tenant } from 'src/app/core/models/tenant';
import { TenantService } from 'src/app/core/services/api/tenant.service';
import { List } from 'immutable';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from 'src/app/core/services/notification.service';
import { BehaviorSubject, finalize } from 'rxjs';
import { ActiveTenantService } from '../../../../core/services/api/active-tenant.service';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-switch-tenant-dialog',
  standalone: true,
  templateUrl: './switch-tenant-dialog.component.html',
  styleUrls: ['./switch-tenant-dialog.component.scss'],
  imports: [CommonModule, MatIconModule, MatButtonModule, HeadlineTwoComponent, MatDialogModule, MatFormFieldModule, MatSelectModule, ReactiveFormsModule, MatOptionModule, ProgressBarComponent]
})
export class SwitchTenantDialogComponent {

  _activeTenant: Tenant | null = null

  form: FormGroup
  tenants: List<Tenant> = List<Tenant>()

  loading$ = new BehaviorSubject<boolean>(false)

  constructor(
    public dialogRef: MatDialogRef<SwitchTenantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private tenantService: TenantService,
    private activeTenantService: ActiveTenantService,
    private notificationService: NotificationService,
  ) {

    this.activeTenant = data.activeTenant
    this.form = this.formBuilder.group({
      tenantId: ['', [Validators.required]],
    })
  }

  set activeTenant(value: Tenant) {
    this._activeTenant = value
    this.loadTenants()
  }

  get formTenantId() {
    return this.form.get('tenantId')!
  }

  handleSuccessEvent(success: boolean): void {
    if (!success) return
    this.dialogRef.close(success)
  }

  updateUser() {
    if (!this.form.valid) return

    this.loading$.next(true)
    this.activeTenantService.setActiveTenant(this.formTenantId.value).pipe(
      finalize(() => this.loading$.next(false))
    ).subscribe({
      next: (user: User) => {
        this.notificationService.showSuccess('response.success.set-active-tenant')
        this.dialogRef.close(true)
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError(error.message)
      }
    })
  }

  private loadTenants() {
    this.loading$.next(true)

    this.tenantService.index().pipe(finalize(() => this.loading$.next(false))).subscribe({
      next: (response: any) => {
        this.tenants = response
        if (!this._activeTenant) return
        this.formTenantId.setValue(this._activeTenant.id)
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError(error.message)
      }
    })
  }
}
