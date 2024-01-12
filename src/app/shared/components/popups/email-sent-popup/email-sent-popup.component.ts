import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-email-sent-popup',
  templateUrl: './email-sent-popup.component.html',
  styleUrls: ['./email-sent-popup.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailSentPopupComponent {
  constructor(private activeModel: NgbActiveModal) { }

  public dismiss() {
    this.activeModel.dismiss()
  }
}
