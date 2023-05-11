import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { TimerCmdService } from './api/timer-cmd.service';
import { Timer } from '../models/timer';

@Injectable({
  providedIn: 'root',
})
export class TimerService {

  private startTime: number | null = null
  private stopTime: number | null = null

  private timerRunningSubject = new BehaviorSubject<boolean>(false)
  timerRunning$ = this.timerRunningSubject.asObservable()

  constructor(private timerCmdService: TimerCmdService) {
    this.initializeTimer()
  }

  getTime(): Observable<number> {
    return interval(1000).pipe(map((startTime: any) => {
      if (!this.startTime) {
        return 0
      }

      if (this.startTime && this.stopTime) {
        const elapsedTime = Math.round((this.stopTime! - this.startTime!) / 1000)
        return elapsedTime
      }

      let elapsedTime = (Date.now() - this.startTime!) / 1000
      return Math.round(elapsedTime)
    }))
  }

  start(): Observable<Timer> {
    return this.timerCmdService.start().pipe(
      map((response: any) => new Timer(response.data)),
      tap((timer: Timer) => {
        this.setLocalStorageTimer(timer)

        this.startTime = timer!.createdAt
        this.timerRunningSubject.next(timer!.isRunning)
      })
    )
  }

  stop(): Observable<Timer> {
    return this.timerCmdService.stop().pipe(
      map((response: any) => new Timer(response.data)),
      tap((timer: Timer) => {
        this.setLocalStorageTimer(timer)

        this.stopTime = timer!.createdAt === timer!.updatedAt ? null : timer!.updatedAt
        this.timerRunningSubject.next(timer!.isRunning)
      })
    )
  }

  delete(): Observable<boolean> {
    return this.timerCmdService.delete().pipe(
      map((response: any) => response.data),
      tap((data: any) => {
        if (!data.deleted) return 
        this.startTime = null
        this.stopTime = null
        this.timerRunningSubject.next(false)
        this.removeLocalStorageTimer()
      })
    )
  }

  private initializeTimer() {
    const storedTimer = this.getLocalStorageTimer()

    if (storedTimer) {
      this.startTime = storedTimer!.createdAt
      this.stopTime = storedTimer!.createdAt === storedTimer!.updatedAt ? null : storedTimer!.updatedAt
      this.timerRunningSubject.next(storedTimer!.isRunning)
    } else {
      this.fetchTimer()
    }
  }

  private fetchTimer() {
    this.timerCmdService.getTimer().pipe(
      map((response: any) => response.data)
    ).subscribe({
      next: (timerData: any) => {
        if (timerData.id === null) {
          this.removeLocalStorageTimer()
          return
        }

        const timer = new Timer(timerData)
        this.setLocalStorageTimer(timer)

        this.startTime = timer!.createdAt
        this.stopTime = timer!.createdAt === timer!.updatedAt ? null : timer!.updatedAt
        this.timerRunningSubject.next(timer!.isRunning)
      },
    })
  }

  private setLocalStorageTimer(timer: Timer) {
    localStorage.setItem('timer', JSON.stringify(timer))
  }

  private removeLocalStorageTimer() {
    localStorage.removeItem('timer')
  }

  private getLocalStorageTimer(): Timer | null {
    const timer = localStorage.getItem('timer')
    if (!timer) return null

    const timerData = JSON.parse(timer)
    return timerData
  }
}


