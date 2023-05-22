import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { ProgressBarComponent } from 'src/app/shared/ui/progress-bar/progress-bar.component'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { HttpErrorResponse } from '@angular/common/http'
import { NotificationService } from '../../../core/services/notification.service';
import { finalize } from 'rxjs'
import { UserService } from 'src/app/core/services/api/user.service'
import { User } from 'src/app/core/models/user'

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule,
    ProgressBarComponent
  ],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent {
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
    return this.form.get('name')
  }

  get nameControl() {
    return this.form.get('email')
  }

  constructor(private formBuilder: FormBuilder, private userService: UserService, private notificationService: NotificationService) {
    this.form = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
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


  private create(data: User): void {
    this.startLoadingEvent.emit()

    this.userService.store(data).pipe(
      finalize(() => {
        this.stopLoadingEvent.emit()
      })
    ).subscribe({
      next: () => {
        this.successEvent.emit()
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message)
      }
    })
  }

  private update(data: User): void {
    this.startLoadingEvent.emit()

    this.userService.update(data.id, data).pipe(
      finalize(() => {
        this.stopLoadingEvent.emit()
      })
    ).subscribe({
      next: () => {
        this.successEvent.emit()
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message)
      }
    })
  }

  private getData(id: number): void {
    this.startLoadingEvent.emit()

    this.userService.show(id).pipe(
      finalize(() => {
        this.stopLoadingEvent.emit()
      })
    ).subscribe({
      next: (data: any) => {
        this.form.patchValue(data.data)
      },
      error: (error: HttpErrorResponse) => {
        console.log(error)
        this.notificationService.showError(error.error.message)
      }
    })
  }
}
