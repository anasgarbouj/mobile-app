import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-ticket-called-popup',
  templateUrl: './ticket-called-popup.component.html',
  styleUrls: ['./ticket-called-popup.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketCalledPopupComponent{

  constructor(private activeModel: NgbActiveModal) { }

  public dismiss() {
    this.activeModel.dismiss()
  }
}
