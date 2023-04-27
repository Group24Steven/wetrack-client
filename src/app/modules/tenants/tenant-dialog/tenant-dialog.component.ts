import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TenantFormComponent } from '../tenant-form/tenant-form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeadlineTwoComponent } from 'src/app/shared/ui/headline-two/headline-two.component';

@Component({
  selector: 'app-tenant-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, TenantFormComponent, MatIconModule, MatButtonModule, HeadlineTwoComponent],
  templateUrl: './tenant-dialog.component.html',
  styleUrls: ['./tenant-dialog.component.scss']
})
export class TenantDialogComponent {
  
  constructor(public dialogRef: MatDialogRef<TenantDialogComponent>) { }

  onFormSubmit(tenantData: any): void {
    this.dialogRef.close(tenantData);
  }
}
