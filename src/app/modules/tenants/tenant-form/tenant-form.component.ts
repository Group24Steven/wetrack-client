import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { ProgressBarComponent } from 'src/app/shared/ui/progress-bar/progress-bar.component'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

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
})
export class TenantFormComponent implements OnInit {

  tenantForm: FormGroup
  @Output() formSubmit: EventEmitter<any> = new EventEmitter()

  get emailControl() {
    return this.tenantForm.get('email')
  }

  get weclappTokenControl() {
    return this.tenantForm.get('weclappToken') 
  }

  get weclappUrlControl() {
    return this.tenantForm.get('weclappUrl')
  }

  constructor(private formBuilder: FormBuilder) {
    this.tenantForm = this.formBuilder.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      weclappToken: ['', Validators.required],
      weclappUrl: ['', Validators.required],
    })
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.tenantForm.valid) {
      this.formSubmit.emit(this.tenantForm.value)
    }
  }
}
