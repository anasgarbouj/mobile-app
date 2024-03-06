import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectorRef,
  Input,
} from '@angular/core';
import { Subscription, interval, take } from 'rxjs';
import { TicketValidationService } from 'src/app/shared/services/ticket-validation.service';

@Component({
  selector: 'app-count-down-time-tracker',
  templateUrl: './count-down-time-tracker.component.html',
  styleUrls: ['./count-down-time-tracker.component.css'],
})
export class CountDownTimeTrackerComponent implements OnInit, OnDestroy {
  @Input()
  ticketId: number | null = null;

  private interval$!: Subscription;
  public minutes: number = 0;
  public seconds: number = 0;
  public timerRunning: boolean = false;
  private timeFromBack: Date = new Date('March  6, 2024  16:14:00');

  constructor(
    private cdRef: ChangeDetectorRef,
    private readonly ticketValidationService: TicketValidationService
  ) {}

  ngOnInit() {
    this.calculateRemainingTime();
    if (this.minutes > 0 || this.seconds > 0) {
      this.startTimer();
    } else {
      this.minutes = 0;
      this.seconds = 0;
      console.log('Time is over');
      this.timerRunning = false;
    }
  }

  ngOnDestroy() {
    this.stopTimer();
    this.resetTimer();
  }

  startTimer() {
    this.timerRunning = true;
    this.interval$ = interval(1000).subscribe(() => {
      this.decrementTime();
      this.cdRef.markForCheck(); //  trigger change detection
    });
  }

  stopTimer() {
    this.interval$.unsubscribe();
    this.resetTimer();
    this.ticketValidationService.sendTicketValidation(this.ticketId).pipe(take(1)).subscribe((res)=>{console.log("Ticket Validation :",res);
    });
  }

  resetTimer() {
    this.minutes = 0;
    this.seconds = 0;
  }

  calculateRemainingTime() {
    this.timerRunning = true;
    const now = new Date();
    const difference = Math.abs(now.getTime() - this.timeFromBack.getTime());

    const maxTimeInMs = 15 * 60 * 1000; // 15 minutes in milliseconds
    // Calculate remaining time based on max allowed time (15 mins)
    this.minutes = Math.floor(
      Math.max(0, maxTimeInMs - difference) / (1000 * 60)
    );
    this.seconds = Math.floor(
      (Math.max(0, maxTimeInMs - difference) % (1000 * 60)) / 1000
    );
  }

  private decrementTime() {
    this.seconds--;
    if (this.seconds < 0) {
      this.seconds = 59;
      this.minutes--;
    }

    if (this.minutes <= 0 && this.seconds == 0) {
      this.stopTimer();
      // TODO: notify backend to delete ticket if finished time and no ticket validation
      console.log('Time is over');
      this.timerRunning = false;
    }
  }

}
