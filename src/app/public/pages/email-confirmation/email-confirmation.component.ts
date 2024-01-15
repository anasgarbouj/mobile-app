import { ChangeDetectionStrategy, Component } from '@angular/core';
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

  openModal(str:string) {
    if (str=="Email_Sent") this.popUpService.openPopup(PopupValidDataTypes.Email_Sent)
    else if (str=="Proximity") this.popUpService.openPopup(PopupValidDataTypes.Proximity)
    else if (str=="Ticket_Success") this.popUpService.openPopup(PopupValidDataTypes.Ticket_Success)
    else if (str=="Lab_Proximity") this.popUpService.openPopup(PopupValidDataTypes.Lab_Proximity)
    else if (str=="Delete_Warning") this.popUpService.openPopup(PopupValidDataTypes.Delete_Warning)
    else if (str=="Ticket_Called") this.popUpService.openPopup(PopupValidDataTypes.Ticket_Called)

  }
}
