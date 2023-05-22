import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
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
  _id: number | null = null

  form: FormGroup

  @Output() successEvent = new EventEmitter()
  @Output() startLoadingEvent = new EventEmitter()
  @Output() stopLoadingEvent = new EventEmitter()

  @Input() set id(value: number | null) {
    this._id = value
    if (value) {
      this.getData(value)
    } else {
      this.form.reset();
    }
  }

  get idControl() {
    return this.form.get('id')
  }

  get emailControl() {
    return this.form.get('email')
  }

  get nameControl() {
    return this.form.get('email')
  }

  get weclappTokenControl() {
    return this.form.get('weclappToken')
  }

  get weclappUrlControl() {
    return this.form.get('weclappUrl')
  }

  constructor(private formBuilder: FormBuilder, private tenantService: TenantService, private notificationService: NotificationService) {
    this.form = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      weclappToken: ['', Validators.required],
      weclappUrl: ['', Validators.required],
    })
  }

  onSubmit(): void {
    if (!this.form.valid) return
    if (this._id) {
      this.update(this.form.value)
      return
    }
    this.create(this.form.value)
  }


  private create(data: Tenant): void {
    this.startLoadingEvent.emit()

    this.tenantService.store(data).pipe(
      finalize(() => {
        this.stopLoadingEvent.emit()
      })
    ).subscribe({
      next: () => {
        this.notificationService.showSuccess('response.success.tenant.created')
        this.successEvent.emit()
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message)
      }
    })
  }

  private update(data: Tenant): void {
    this.startLoadingEvent.emit()

    this.tenantService.update(data.id, data).pipe(
      finalize(() => {
        this.stopLoadingEvent.emit()
      })
    ).subscribe({
      next: () => {
        this.notificationService.showSuccess('response.success.tenant.updated')
        this.successEvent.emit()
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message)
      }
    })
  }

  private getData(id: number): void {
    this.startLoadingEvent.emit()

    this.tenantService.show(id).pipe(
      finalize(() => {
        this.stopLoadingEvent.emit()
      })
    ).subscribe({
      next: (data: any) => {
        this.form.patchValue(data.data)
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message)
      }
    })
  }

  public delete(): void {
    if (!this._id) return 
    
    this.startLoadingEvent.emit()
    this.tenantService.delete(this._id).pipe(
      finalize(() => {
        this.stopLoadingEvent.emit()
      })
    ).subscribe({
      next: () => {
        this.notificationService.showSuccess('response.success.tenant.deleted')
        this.successEvent.emit()
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message)
      }
    })
  }
}
