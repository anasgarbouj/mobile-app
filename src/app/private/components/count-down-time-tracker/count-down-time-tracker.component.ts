import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectorRef,
  Input,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, interval, take } from 'rxjs';
import { PopupService } from 'src/app/shared/services/popup.service';
import { TicketValidationService } from 'src/app/shared/services/ticket-validation.service';
import { errorImageSelect } from 'src/app/shared/types/image-switch';

@Component({
  selector: 'app-count-down-time-tracker',
  templateUrl: './count-down-time-tracker.component.html',
  styleUrls: ['./count-down-time-tracker.component.css'],
})
export class CountDownTimeTrackerComponent implements OnInit, OnDestroy {
  @Input() ticketId: number | null = null;
  @Input() ticketValidationDate: Date = new Date();
  @Input() ticketNumber : number = 0 ;
  @Input() servicePrefix : string = "" ;


  private interval$!: Subscription;
  public diffDate: Date = new Date();
  public timerRunning: boolean = false;
  private isNearby : boolean = false ;

  constructor(
    private cdRef: ChangeDetectorRef,
    private readonly ticketValidationService: TicketValidationService,
    private popupService: PopupService,
    private translate: TranslateService
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

  async resetTimer() {
    this.ticketValidationService.sendTicketValidation(this.ticketId).pipe(take(1)).subscribe(async (res) => {
      this.interval$.unsubscribe();
      this.diffDate = new Date();
      this.ticketValidationDate = new Date(res.ticket_validation_date+"Z");
      this.checkDateDiff();
      this.isNearby = res.is_nearby ;
      if(!this.isNearby){
        const translatedErrorMessage =this.translate.instant(`POPUP.ERROR_MESSAGES.NOT_NEARBY`)
        const errorImageSrc = errorImageSelect("");
        await this.popupService.openPopup(
          translatedErrorMessage,
          errorImageSrc
        );
      }
      if(res.info ==="TICKET_CALLED"){
        this.popupService.openCalledTicketPopup(this.servicePrefix,this.ticketNumber,res.ticket_room_name)
      }

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
