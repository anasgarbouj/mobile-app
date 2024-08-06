import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs';
import { ITicket } from 'src/app/shared/interfaces/ticket';
import { LabsService } from 'src/app/shared/services/labs.service';
import { PopupService } from 'src/app/shared/services/popup.service';
import { TicketsService } from 'src/app/shared/services/tickets.service';
import { successImageSelect } from 'src/app/shared/types/image-switch';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
})
export class TicketComponent implements OnInit {

  @Input() ticket!: ITicket ;
  @Input() ticketTitle: String = "This is the default ticket title";
  @Input() canDelete: boolean = false

  constructor(
    private readonly ticketService: TicketsService,
    private _router: Router,
    private popupService : PopupService,
    private translate: TranslateService,
    private labsService: LabsService,
    ) { }

  ngOnInit() { }

  deleteTicket(){
    this.ticketService.deleteTicket({"ticket_id":this.ticket.ticket_id, "kiosk_group_id":this.labsService.getKioskGroupIfValue()}).pipe(take(1)).subscribe({
      next : (res) =>{
        console.log("delete ticket ", res);
        if(res.info === "TICKET_DELETED"){
          //delete token from local storage and redirect to email page
          const translatedMessage = this.translate.instant(`POPUP.SUCCESS_MESSAGES.${res.info}`);
          const imageSrc = successImageSelect(res.info);
          this.popupService.openPopup(translatedMessage, imageSrc);
          localStorage.removeItem('token');
          this._router.navigate(['/email']);
        }
      }
    })

  }

}
