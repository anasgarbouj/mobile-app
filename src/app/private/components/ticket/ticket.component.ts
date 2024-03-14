import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { ITicket } from 'src/app/shared/interfaces/ticket';
import { TicketsService } from 'src/app/shared/services/tickets.service';

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
