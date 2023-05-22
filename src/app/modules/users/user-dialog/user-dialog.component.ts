import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeadlineTwoComponent } from 'src/app/shared/ui/headline-two/headline-two.component';
import { BehaviorSubject } from 'rxjs';
import { ProgressBarComponent } from 'src/app/shared/ui/progress-bar/progress-bar.component';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, UserFormComponent, MatIconModule, MatButtonModule, HeadlineTwoComponent, ProgressBarComponent],
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDialogComponent {
  id: null | number = null
  loading$ = new BehaviorSubject<boolean>(false)

  constructor(public dialogRef: MatDialogRef<UserDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.id = data.id
  }

  closeDialogWithSuccess(): void {
    this.dialogRef.close(true)
  }
}
