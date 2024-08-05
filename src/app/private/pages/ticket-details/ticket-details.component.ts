import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, take } from 'rxjs';
import { ITicket } from 'src/app/shared/interfaces/ticket';
import { LabsService } from 'src/app/shared/services/labs.service';
import { PopupService } from 'src/app/shared/services/popup.service';
import { TicketValidationService } from 'src/app/shared/services/ticket-validation.service';
import { TicketsService } from 'src/app/shared/services/tickets.service';
import { errorImageSelect, successImageSelect } from 'src/app/shared/types/image-switch';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketDetailsComponent implements OnInit {
  ticketId: number | null = null;
  kiosGroupId: string | null = null;

  ticket: ITicket | undefined;
  ticketLastValidationDate: Date = new Date();

  paramMapSubscription: Subscription | null = null;
  queryParamsSubscription: Subscription | null = null;
  private isNearby: boolean = false;
  checkTicketInterval: any;

  constructor(
    private route: ActivatedRoute,
    private readonly ticketService: TicketsService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private popupService: PopupService,
    private translate: TranslateService,
    private readonly ticketValidationService: TicketValidationService,
    private readonly labsService: LabsService
  ) {
    this.paramMapSubscription = this.route.paramMap.subscribe(params => {
      this.ticketId = params.get('ticketId') ? Number(params.get('ticketId')) : null;
      this.kiosGroupId = params.get('kioskGroupId')
      if (this.kiosGroupId) {
        this.labsService.setKioskGroupId(this.kiosGroupId)
      }
    });
  }

  ngOnInit() {
    this.queryParamsSubscription = this.route.queryParams.subscribe(queryParams => {
      if ("token" in queryParams && queryParams['token']) {
        localStorage.setItem('token', queryParams['token'])
        if (this.ticketId) {
          this.router.navigate([`private/ticket/${this.ticketId}/${this.kiosGroupId}`], { replaceUrl: true })
        }
      } else if (localStorage.hasOwnProperty("token") && this.ticketId && this.kiosGroupId) {
        this.getTicket(this.ticketId);
      }
    });

    this.checkTicketInterval = setInterval(() => {
      console.log("ticket validation triggered");
      this.checkTicketCall();

    }, 5000);
  }

  getTicket(id: number) {
    this.ticketService.retrieveTicket(id).pipe(
      take(1)
    ).subscribe((res) => {
      this.ticket = res.data as ITicket;
      console.log("Checking ticket data in ticket-details-component",this.ticket);
      this.ticketLastValidationDate = new Date(this.ticket.ticket_validation_date)
      this.cdr.detectChanges();
    })
  }


  async checkTicketCall(){
    this.ticketValidationService
    .sendTicketValidation(this.ticketId)
    .pipe(take(1))
    .subscribe(async (res) => {
      this.isNearby = res.is_nearby;
      if (res.info === 'TICKET_CALLED') {
        clearInterval(this.checkTicketInterval);
        console.log("Check values of ","ticket number :" ,this.ticket?.ticket_number, "Service prefix :",this.ticket?.ticket_prefix_service);
        await this.popupService.openCalledTicketPopup(
          this.ticket?.ticket_prefix_service,
          this.ticket?.ticket_number,
          res.ticket_room_name
        );

        const translatedSuccessMessage = this.translate.instant(  `POPUP.SUCCESS_MESSAGES.TICKET_SUCCESSFULLY_TREATED` );
        const successImgSrc = successImageSelect(  'TICKET_SUCCESSFULLY_TREATED');
        await this.popupService.openPopup(
          translatedSuccessMessage,
          successImgSrc
        );

        this.router.navigate(["/identify-lab"]);

      } else if (!this.isNearby) {
        const translatedErrorMessage = this.translate.instant(
          `POPUP.ERROR_MESSAGES.NOT_NEARBY`
        );
        const errorImageSrc = errorImageSelect('');
        await this.popupService.openPopup(
          translatedErrorMessage,
          errorImageSrc
        );
      }
    });
  }

  ngOnDestroy() {
    if (this.paramMapSubscription) {
      this.paramMapSubscription.unsubscribe();
    }
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
    if (this.checkTicketInterval) {
      clearInterval(this.checkTicketInterval);
    }
  }
}
