import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
})
export class TicketComponent implements OnInit {

  @Input() ticket: any;
  @Input() ticketTitle: String = "This is the default ticket title";
  @Input() canDelete: boolean = false

  constructor() { }

  ngOnInit() { }

}
