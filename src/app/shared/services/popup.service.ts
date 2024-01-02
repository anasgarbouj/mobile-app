import { EventEmitter, Injectable } from '@angular/core';
import { PopupValidDataTypes } from '../types/PopupValidDataTypes';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProximityPopupComponent } from '../components/proximity-popup/proximity-popup.component';
import { EmailSentPopupComponent } from 'src/app/appointment/components/email-sent-popup/email-sent-popup.component';
import { TicketSuccessPopupComponent } from 'src/app/appointment/components/ticket-success-popup/ticket-success-popup.component';
import { LabProximityPopupComponent } from 'src/app/core/components/lab-proximity-popup/lab-proximity-popup.component';
import { TicketCalledPopupComponent } from 'src/app/core/components/ticket-called-popup/ticket-called-popup.component';

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
