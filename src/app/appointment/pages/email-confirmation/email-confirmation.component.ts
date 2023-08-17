import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProximityPopupComponent } from 'src/app/shared/components/proximity-popup/proximity-popup.component';
import { PopupService } from 'src/app/shared/services/popup.service';
import { PopupValidDataTypes } from 'src/app/shared/types/PopupValidDataTypes';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailConfirmationComponent {

  constructor(private popUpService: PopupService) { }

  openModal() {

    this.popUpService.openPopup(PopupValidDataTypes.Email_Sent)
  }
}
