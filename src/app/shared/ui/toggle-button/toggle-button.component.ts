import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-toggle-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleButtonComponent {

  activeButton = 1

  @Input() firstButtonIcon!: string
  @Input() secondButtonIcon!: string

  @Output() activeChangedEvent = new EventEmitter<number>()

  selectButton(buttonNumber: number) {
    this.activeButton = buttonNumber
    // Emit true if Button 1 is active, false if Button 2 is active
    this.activeChangedEvent.emit(this.activeButton)
  }
}
