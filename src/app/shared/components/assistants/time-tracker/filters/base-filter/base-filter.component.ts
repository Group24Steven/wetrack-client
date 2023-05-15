import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ControlValueAccessor, FormControl } from '@angular/forms';

@Component({
  selector: 'app-base-filter',
  standalone: true,
  imports: [
    CommonModule,
    MatAutocompleteModule,
  ],
  templateUrl: './base-filter.component.html',
  styleUrls: ['./base-filter.component.scss']
})
export class BaseFilterComponent implements ControlValueAccessor {

  blockSearch = false

  formControl = new FormControl()

  onChange: (value: any) => void = () => { }
  onTouched: () => void = () => { }

  @Output() searchResult: EventEmitter<any> = new EventEmitter()
  @Output() laodingStart = new EventEmitter<void>()
  @Output() loadingEnd = new EventEmitter<void>()

  writeValue(value: any): void {
    this.formControl.setValue(value)
  }

  registerOnChange(fn: any): void {
    this.formControl.valueChanges.subscribe(fn)
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  selected(event: any): void {
    this.blockSearch = true
    this.searchResult.emit()
  }

  resetSelection() {
    this.blockSearch = false
  }
}
