import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-message-popup',
  templateUrl: './message-popup.component.html',
  styleUrls: ['./message-popup.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagePopupComponent {
  @Input() message: string = "";
  @Input() imageSrc: string = "";

  constructor(
    private activeModel: NgbActiveModal
  ) { }

  closePopup() {
    this.activeModel.close(false)
  }
}
