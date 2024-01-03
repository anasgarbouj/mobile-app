import { EventEmitter, Injectable } from '@angular/core';
import { PopupValidDataTypes } from '../types/PopupValidDataTypes';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProximityPopupComponent } from '../components/proximity-popup/proximity-popup.component';
import { EmailSentPopupComponent } from 'src/app/appointment/components/email-sent-popup/email-sent-popup.component';
import { TicketSuccessPopupComponent } from 'src/app/appointment/components/ticket-success-popup/ticket-success-popup.component';
import { LabProximityPopupComponent } from 'src/app/core/components/lab-proximity-popup/lab-proximity-popup.component';
<<<<<<< HEAD
import { WarningDeleteTicketPopupComponent } from 'src/app/core/components/warning-delete-ticket-popup/warning-delete-ticket-popup.component';
=======
import { TicketCalledPopupComponent } from 'src/app/core/components/ticket-called-popup/ticket-called-popup.component';
>>>>>>> e647e27b73d75b77bc91d6f963dbcc378243b161

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
        this.open(EmailSentPopupComponent)
        break
      case PopupValidDataTypes.Ticket_Success:
        this.open(TicketSuccessPopupComponent)
        break
      case PopupValidDataTypes.Lab_Proximity:
        this.open(LabProximityPopupComponent)
        break
<<<<<<< HEAD
      case PopupValidDataTypes.Delete_Warning:
        this.open(WarningDeleteTicketPopupComponent)
=======
      case PopupValidDataTypes.Ticket_Called:
        this.open(TicketCalledPopupComponent)
>>>>>>> e647e27b73d75b77bc91d6f963dbcc378243b161
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
