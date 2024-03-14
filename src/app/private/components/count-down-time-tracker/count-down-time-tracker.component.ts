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
  @Input() ticketId: number | null = null;
  @Input() ticketValidationDate: Date = new Date();

  private interval$!: Subscription;
  public diffDate: Date = new Date();
  public timerRunning: boolean = false;

  constructor(
    private cdRef: ChangeDetectorRef,
    private readonly ticketValidationService: TicketValidationService
  ) { }

  ngOnInit() {
    this.checkDateDiff();
  }

  checkDateDiff(){
    if (this.ticketValidationDate && (this.diffDate <= (new Date(this.ticketValidationDate.getTime() + (15 * 60000))))) {
      this.startTimer();
    } else {
      this.diffDate = new Date();
      this.diffDate.setMinutes(0);
      this.diffDate.setSeconds(0);
      console.log('Time is over');
      this.timerRunning = false;
      this.cdRef.detectChanges();
    }
  }

  startTimer() {
    this.timerRunning = true;
    this.interval$ = interval(1000).subscribe(() => {
      this.calculateRemainingTime()
      this.cdRef.markForCheck(); //  trigger change detection
    });
  }

  resetTimer() {
    this.ticketValidationService.sendTicketValidation(this.ticketId).pipe(take(1)).subscribe((res) => {
      this.interval$.unsubscribe();
      this.diffDate = new Date();
      this.ticketValidationDate = new Date(res.ticket_validation_date+"Z");
      this.checkDateDiff();
    });
  }

  calculateRemainingTime() {
    this.timerRunning = true;
    const now = new Date();
    const differenceInMilliseconds = Math.abs(now.getTime() - (this.ticketValidationDate.getTime()));
    const maxTimeInMs = 15 * 60 * 1000; // 15 minutes in milliseconds

    this.diffDate = new Date();
    this.diffDate.setMinutes((Math.max(0, maxTimeInMs - differenceInMilliseconds) / (1000 * 60)));
    this.diffDate.setSeconds((Math.max(0, maxTimeInMs - differenceInMilliseconds) % (1000 * 60)) / 1000);
  }

  ngOnDestroy() {
    this.interval$.unsubscribe();
  }
}
