import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-warning-delete-ticket-popup',
  templateUrl: './warning-delete-ticket-popup.component.html',
  styleUrls: ['./warning-delete-ticket-popup.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WarningDeleteTicketPopupComponent {

  constructor(private activeModel: NgbActiveModal) { }
  
  public dismiss() {
    this.activeModel.dismiss()
  }

}
