import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable, of } from 'rxjs';
import { map, tap, startWith, catchError } from 'rxjs/operators';
import { TimerCmdService } from './api/timer-cmd.service';
import { Timer } from '../models/timer';

@Injectable({
  providedIn: 'root',
})
export class TimerService {

  startTime: number | null = null
  endTime: number | null = null

  timerRunningSubject = new BehaviorSubject<boolean>(false)
  timerRunning$ = this.timerRunningSubject.asObservable()

  constructor(private timerCmdService: TimerCmdService) {
    this.initializeTimer()
  }

  getTime(): Observable<number> {
    return interval(1000).pipe(startWith(() => this.handleElapsedTime()), map(() => this.handleElapsedTime()))
  }

  start(): Observable<Timer> {
    this.startTime = Date.now()
    this.timerRunningSubject.next(true)

    return this.timerCmdService.start(this.startTime).pipe(
      map((response: any) => new Timer(response.data)),
      tap((timer: Timer) => {
        this.setLocalStorageTimer(timer)
      })
    )
  }

  stop(): Observable<Timer> {
    this.endTime = Date.now()
    this.timerRunningSubject.next(false)

    return this.timerCmdService.stop(this.endTime).pipe(
      map((response: any) => new Timer(response.data)),
      tap((timer: Timer) => {
        this.setLocalStorageTimer(timer)

        this.startTime = timer!.startTime
        this.endTime = timer!.endTime
        this.timerRunningSubject.next(!timer.endTime)
      })
    )
  }

  delete(): Observable<boolean> {
    return this.timerCmdService.delete().pipe(
      map((response: any) => response.data),
      catchError((error: any) => {
        this.resetTimerService()
        return of(true)
      }),
      tap((data: any) => {
        if (!data.deleted) return
        this.resetTimerService()
      })
    )
  }

  private initializeTimer() {
    const storedTimer = this.getLocalStorageTimer()

    if (storedTimer) {
      this.startTime = storedTimer.startTime
      this.endTime = storedTimer.endTime
      this.timerRunningSubject.next(!storedTimer.endTime)
    } 

    this.fetchTimer()
  }

  private fetchTimer() {
    this.timerCmdService.get().pipe(
      map((response: any) => response.data)
    ).subscribe({
      next: (timerData: any) => {
        if (!timerData.id) {
          this.removeLocalStorageTimer()
          return
        }

        const timer = new Timer(timerData)
        this.setLocalStorageTimer(timer)

        this.startTime = timer!.startTime
        this.endTime = timer!.endTime
        this.timerRunningSubject.next(!timer.endTime)
      },
    })
  }

  private getLocalStorageTimer(): Timer | null {
    const timer = localStorage.getItem('timer')
    if (!timer) return null

    const timerData = JSON.parse(timer)
    return timerData
  }

  private setLocalStorageTimer(timer: Timer) {
    localStorage.setItem('timer', JSON.stringify(timer))
  }

  private removeLocalStorageTimer() {
    localStorage.removeItem('timer')
  }

  private resetTimerService() {
    this.startTime = null
    this.endTime = null
    this.timerRunningSubject.next(false)
    this.removeLocalStorageTimer()
  }

  private calculateElapsedTime(startTime: number, comparableTime: number): number {
    return Math.round((comparableTime - startTime) / 1000)
  }

  private handleElapsedTime(): number {
    if (!this.startTime) return 0

    if (this.startTime && this.endTime) {
      return this.calculateElapsedTime(this.startTime, this.endTime)
    }

    return this.calculateElapsedTime(this.startTime, Date.now())
  }
}


