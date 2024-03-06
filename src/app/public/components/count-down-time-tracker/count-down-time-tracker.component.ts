import { Component, Input, OnDestroy, OnInit, Output ,ChangeDetectorRef} from '@angular/core';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-count-down-time-tracker',
  templateUrl: './count-down-time-tracker.component.html',
  styleUrls: ['./count-down-time-tracker.component.css'],
})
export class CountDownTimeTrackerComponent implements OnInit, OnDestroy {

  private interval$: any;
  public minutes: number = 15;
  public seconds: number = 0;
  public timerRunning: boolean = false;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.startTimer();
  }

  ngOnDestroy() {
    this.stopTimer();
    this.resetTimer();
  }

  startTimer() {
    this.timerRunning = true;
    this.interval$ = interval(1000).pipe(takeWhile(() => this.timerRunning));
    this.interval$.subscribe(() => {
      this.decrementTime();
      this.cdRef.markForCheck(); //  trigger change detection
    });
  }

  stopTimer() {
    this.timerRunning = false;
    if (this.interval$) {
      this.interval$.unsubscribe();
    }
  }

  resetTimer() {
    this.stopTimer();
    this.minutes = 15;
    this.seconds = 0;
  }

  private decrementTime() {
    this.seconds--;
    if (this.seconds < 0) {
      this.seconds = 59;
      this.minutes--;
    }

    if (this.minutes <= 0 && this.seconds <= 0) {
      this.stopTimer();
      // TODO: notify backend to delete ticket if finished time and no ticket validation
      console.log("Time is over");

    }
  }
}
