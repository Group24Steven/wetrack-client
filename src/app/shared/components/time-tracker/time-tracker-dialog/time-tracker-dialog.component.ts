import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HeadlineTwoComponent } from 'src/app/shared/ui/headline-two/headline-two.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TimerTrackerComponent } from '../time-tracker.component';

@Component({
  selector: 'app-time-tracker-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule, MatButtonModule, TimerTrackerComponent, HeadlineTwoComponent],
  templateUrl: './time-tracker-dialog.component.html',
  styleUrls: ['./time-tracker-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeTrackerDialogComponent {

  constructor(public dialogRef: MatDialogRef<TimeTrackerDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  handleSuccessEvent(success: boolean): void {
    if (!success) return
    this.dialogRef.close(success)
  }
}
