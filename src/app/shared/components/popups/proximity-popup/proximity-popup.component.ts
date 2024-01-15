import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-proximity-popup',
  templateUrl: './proximity-popup.component.html',
  styleUrls: ['./proximity-popup.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProximityPopupComponent {

  constructor(private activeModel: NgbActiveModal) { }

  public dismiss() {
    this.activeModel.dismiss()
  }
}
