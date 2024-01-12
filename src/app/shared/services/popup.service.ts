import { EventEmitter, Injectable } from '@angular/core';
import { PopupValidDataTypes } from '../types/PopupValidDataTypes';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProximityPopupComponent } from '../components/popups/proximity-popup/proximity-popup.component';
import { TicketSuccessPopupComponent } from 'src/app/shared/components/popups/ticket-success-popup/ticket-success-popup.component';
import { LabProximityPopupComponent } from 'src/app/shared/components/popups/lab-proximity-popup/lab-proximity-popup.component';
import { WarningDeleteTicketPopupComponent } from 'src/app/shared/components/popups/warning-delete-ticket-popup/warning-delete-ticket-popup.component';
import { TicketCalledPopupComponent } from 'src/app/shared/components/popups/ticket-called-popup/ticket-called-popup.component';
import { EmailSentPopupComponent } from '../components/popups/email-sent-popup/email-sent-popup.component';

@Injectable({
  providedIn: 'root'
})

export class PopupService {

  constructor(private modalService: NgbModal) { }

  openPopup(name: PopupValidDataTypes) {

    switch (name) {
      case PopupValidDataTypes.Proximity:
        this.open(ProximityPopupComponent)
        break
      case PopupValidDataTypes.Email_Sent:
        console.log('Play clicked');
        this.open(EmailSentPopupComponent)
        break
      case PopupValidDataTypes.Ticket_Success:
        this.open(TicketSuccessPopupComponent)
        break
      case PopupValidDataTypes.Lab_Proximity:
        this.open(LabProximityPopupComponent)
        break
      case PopupValidDataTypes.Delete_Warning:
        this.open(WarningDeleteTicketPopupComponent)
        break
      case PopupValidDataTypes.Ticket_Called:
        this.open(TicketCalledPopupComponent)
        break
    }

  }

  open(content: any) {
    this.modalService.open(content, {
      centered: true,
      modalDialogClass: 'custom-diag'
    })
  }
}
