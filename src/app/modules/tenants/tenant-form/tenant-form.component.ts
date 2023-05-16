import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { ProgressBarComponent } from 'src/app/shared/ui/progress-bar/progress-bar.component'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { TenantService } from '../../../core/services/api/tenant.service';
import { HttpErrorResponse } from '@angular/common/http'
import { NotificationService } from '../../../core/services/notification.service';
import { finalize } from 'rxjs'
import { Tenant } from 'src/app/core/models/tenant'

@Component({
  selector: 'app-tenant-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule,
    ProgressBarComponent
  ],
  templateUrl: './tenant-form.component.html',
  styleUrls: ['./tenant-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TenantFormComponent {
  _tenantId: number | null = null

  tenantForm: FormGroup

  @Output() successEvent = new EventEmitter()
  @Output() startLoadingEvent = new EventEmitter()
  @Output() stopLoadingEvent = new EventEmitter()

  @Input() set tenantId(value: number | null) {
    this._tenantId = value
    if (value) {
      this.getTenant(value)
    } else {
      this.tenantForm.reset();
    }
  }

  get idControl() {
    return this.tenantForm.get('id')
  }

  get emailControl() {
    return this.tenantForm.get('email')
  }

  get weclappTokenControl() {
    return this.tenantForm.get('weclappToken')
  }

  get weclappUrlControl() {
    return this.tenantForm.get('weclappUrl')
  }

  constructor(private formBuilder: FormBuilder, private tenantService: TenantService, private notificationService: NotificationService) {
    this.tenantForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      weclappToken: ['', Validators.required],
      weclappUrl: ['', Validators.required],
    })
  }

  onSubmit(): void {
    if (!this.tenantForm.valid) return
    if (this._tenantId) {
      this.updateTenant(this.tenantForm.value)
      return
    }
    this.createTenant(this.tenantForm.value)
  }


  private createTenant(tenantData: Tenant): void {
    this.startLoadingEvent.emit()

    this.tenantService.store(tenantData).pipe(
      finalize(() => {
        this.stopLoadingEvent.emit()
      })
    ).subscribe({
      next: () => {
        this.successEvent.emit()
      },
      error: (err: HttpErrorResponse) => {
        this.notificationService.showError(err.error.message)
      }
    })
  }

  private updateTenant(tenantData: Tenant): void {
    this.startLoadingEvent.emit()

    this.tenantService.update(tenantData.id, tenantData).pipe(
      finalize(() => {
        this.stopLoadingEvent.emit()
      })
    ).subscribe({
      next: () => {
        this.successEvent.emit()
      },
      error: (err: HttpErrorResponse) => {
        this.notificationService.showError(err.error.message)
      }
    })
  }

  private getTenant(id: number): void {
    this.startLoadingEvent.emit()

    this.tenantService.show(id).pipe(
      finalize(() => {
        this.stopLoadingEvent.emit()
      })
    ).subscribe({
      next: (data: any) => {
        this.tenantForm.patchValue(data.data)
      },
      error: (err: HttpErrorResponse) => {
        this.notificationService.showError(err.error.message)
      }
    })
  }
}
