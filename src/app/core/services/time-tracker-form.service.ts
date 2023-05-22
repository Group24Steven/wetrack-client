import { Injectable } from '@angular/core';
import { TimeRecordType } from '../enums/time-record-type';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';

@Injectable({
  providedIn: 'root'
})
export class TimeTrackerAssistantService {

  form: FormGroup
  currentStep = 1
  durationSeconds = 60
  startTime: number

  types: any[] = [
    { value: TimeRecordType.Task, viewValue: 'Aufgabe' },
    { value: TimeRecordType.Customer, viewValue: 'Kunde' },
    { value: TimeRecordType.Ticket, viewValue: 'Ticket' },
    { value: TimeRecordType.Project, viewValue: 'Projekt' },
  ]

  constructor(private fb: FormBuilder,) {
    this.form = this.fb.group({
      searchType: ['', Validators.required],
      startDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      description: ['', Validators.required],
      taskId: [''],
      projectTaskId: [''],
    })
  }

  moveToNextStep() {
    this.currentStep++
  }

  moveToPreviousStep() {
    this.currentStep--
  }

  calculateDuration() {
    if (this.formStartDate.value && this.formStartTime.value && this.formEndTime.value) {
      const [startHours, startMinutes] = this.formStartTime.value.split(':').map(Number)
      const [endHours, endMinutes] = this.formEndTime.value.split(':').map(Number)

      const startDate = new Date(this.formStartDate.value);
      const startTime = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startHours, startMinutes).getTime()

      const endDate = new Date(this.formStartDate.value)
      const end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), endHours, endMinutes)

      const durationInSeconds = (end.getTime() - startTime) / 1000
      this.durationSeconds = durationInSeconds
      this.startTime = startTime
    }
  }

  reset() {
    this.currentStep = 1
    this.durationSeconds = 60
    this.form.reset()
  }


  get formStartDate() {
    return this.form.get('startDate')!
  }
  get formDurationSeconds() {
    return this.form.get('durationSeconds')!
  }

  get formDescription() {
    return this.form.get('description')!
  }

  get formTaskId() {
    return this.form.get('taskId')!
  }

  get formProjectTaskId() {
    return this.form.get('projectTaskId')!
  }

  get formStartTime() {
    return this.form.get('startTime')!
  }

  get formEndTime() {
    return this.form.get('endTime')!
  }


  get formSearchType() {
    return this.form.get('searchType')!
  }
}
