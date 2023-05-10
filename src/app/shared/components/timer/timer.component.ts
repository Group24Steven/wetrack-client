import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DurationPipe } from "../../pipes/duration.pipe";

@Component({
    selector: 'app-timer',
    standalone: true,
    templateUrl: './timer.component.html',
    styleUrls: ['./timer.component.scss'],
    imports: [CommonModule, MatIconModule, MatProgressSpinnerModule, DurationPipe]
})
export class TimerComponent {

  today: Date = new Date()

}
