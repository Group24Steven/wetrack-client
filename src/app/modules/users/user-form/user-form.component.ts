import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input'
import { ProgressBarComponent } from 'src/app/shared/ui/progress-bar/progress-bar.component'
import { FormGroup, Validators } from '@angular/forms'
import { HttpErrorResponse } from '@angular/common/http'
import { NotificationService } from '../../../core/services/notification.service';
import { finalize, map } from 'rxjs'
import { UserService } from 'src/app/core/services/api/user.service'
import { User } from 'src/app/core/models/user'

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSlideToggleModule,
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

  constructor(private formBuilder: NonNullableFormBuilder, private userService: UserService, private notificationService: NotificationService) {
    this.form = this.formBuilder.group({
      id: [''],
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      is_admin: [0, [Validators.required]]
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
        this.notificationService.showSuccess('Der Benutzer wurde erfolgreich angelegt.')
        this.successEvent.emit()
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message)
      }
    })
  }

  private update(user: User): void {
    this.startLoadingEvent.emit()

    this.userService.update(user.id, user).pipe(
      finalize(() => {
        this.stopLoadingEvent.emit()
      })
    ).subscribe({
      next: () => {
        this.notificationService.showSuccess('Der Benutzer wurder erfolgreich bearbeitet.')
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
      }),
      map((data: any) => {
        return new User(data.data)
      })
    ).subscribe({
      next: (data: User) => {
        this.form.patchValue(data)
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message)
      }
    })
  }

  public delete(): void {
    if (!this._id) return

    this.startLoadingEvent.emit()

    this.userService.delete(this._id).pipe(
      finalize(() => {
        this.stopLoadingEvent.emit()
      })
    ).subscribe({
      next: () => {
        this.notificationService.showSuccess('Der Benutzer wurde erfolgreich gelöscht.')
        this.successEvent.emit()
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.showError(error.error.message)
      }
    })
  }
}
