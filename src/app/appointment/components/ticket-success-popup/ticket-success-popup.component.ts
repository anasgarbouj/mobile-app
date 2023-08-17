import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ticket-success-popup',
  templateUrl: './ticket-success-popup.component.html',
  styleUrls: ['./ticket-success-popup.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketSuccessPopupComponent {
  constructor(private activeModel: NgbActiveModal) { }

  public dismiss() {
    this.activeModel.dismiss()
  }
}
