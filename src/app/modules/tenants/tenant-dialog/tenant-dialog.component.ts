import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TenantFormComponent } from '../tenant-form/tenant-form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeadlineTwoComponent } from 'src/app/shared/ui/headline-two/headline-two.component';
import { BehaviorSubject } from 'rxjs';
import { ProgressBarComponent } from 'src/app/shared/ui/progress-bar/progress-bar.component';

@Component({
  selector: 'app-tenant-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, TenantFormComponent, MatIconModule, MatButtonModule, HeadlineTwoComponent, ProgressBarComponent],
  templateUrl: './tenant-dialog.component.html',
  styleUrls: ['./tenant-dialog.component.scss']
})
export class TenantDialogComponent {
  tenantId: null | number = null
  loading$ = new BehaviorSubject<boolean>(false)

  constructor(public dialogRef: MatDialogRef<TenantDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.tenantId = data.id
  }

  closeDialogWithSuccess(): void {
  }
}
