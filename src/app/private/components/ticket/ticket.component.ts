import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
})
export class TicketComponent  implements OnInit {

  
  @Input()
  isTicketCalled : boolean = false

  @Input()
  toDelete : boolean = false


  @Input()
  ticketTitle : String = "This is the default ticket title"

  @Input()
  ownerName : String ="nom proprietaire"

  @Input()
  ownerDetails : String ="Information du propriétaire"

  @Input()
  ticketNumber : String ="056"

  @Input()
  ticketServicePrefix : String ="p"

  @Input()
  ticketService: String ="prise de sang"

  @Input()
  ticketRoom : String  = "S1"

  @Input()
  waitingTime : String ="0"

  @Input()
  date : String ="12/06/2022"

  @Input()
  time : String ="15:20"

  @Input()
  website : String ="https://www.siteweb.fr/"

  constructor() { }

  ngOnInit() {}

}
