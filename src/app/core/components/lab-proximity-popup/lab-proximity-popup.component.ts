import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-lab-proximity-popup',
  templateUrl: './lab-proximity-popup.component.html',
  styleUrls: ['./lab-proximity-popup.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabProximityPopupComponent {
  constructor(private activeModel: NgbActiveModal) { }

  public dismiss() {
    this.activeModel.dismiss()
  }
}
