import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core/dist/lib/translate.service';
import { take } from 'rxjs';
import { ITicket } from 'src/app/shared/interfaces/ticket';
import { PopupService } from 'src/app/shared/services/popup.service';
import { TicketsService } from 'src/app/shared/services/tickets.service';
import { errorImageSelect } from 'src/app/shared/types/image-switch';

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
    private popupService: PopupService,
    private translate: TranslateService
    ) { }

  ngOnInit() { }

  deleteTicket(){
    this.ticketService.deleteTicket(this.ticket.ticket_id).pipe(take(1)).subscribe({
      next : (res) =>{
        console.log("delete ticket ", res);
        if(res.info === "TICKET_DELETED"){
          //delete token from local storage and redirect to email page
          localStorage.removeItem('token');
          this._router.navigate(['/email']);
        }
      }
    })

  }

}
