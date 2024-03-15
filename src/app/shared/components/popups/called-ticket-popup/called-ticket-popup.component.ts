import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-called-ticket-popup',
  templateUrl: './called-ticket-popup.component.html',
  styleUrls: ['./called-ticket-popup.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalledTicketPopupComponent  implements OnInit {

  constructor(private activeModel: NgbActiveModal) { }

  @Input()
  servicePrefix : string ="P";
  @Input()
  ticketNumber : number = 56;
  @Input()
  ticketRoom : String  = "S1"


  ngOnInit() {}

  public dismiss() {
    this.activeModel.dismiss()
  }

}
