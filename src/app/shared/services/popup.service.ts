import { EventEmitter, Injectable } from '@angular/core';
import { PopupValidDataTypes } from '../types/PopupValidDataTypes';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProximityPopupComponent } from '../components/popups/proximity-popup/proximity-popup.component';
import { TicketSuccessPopupComponent } from 'src/app/shared/components/popups/ticket-success-popup/ticket-success-popup.component';
import { LabProximityPopupComponent } from 'src/app/shared/components/popups/lab-proximity-popup/lab-proximity-popup.component';
import { WarningDeleteTicketPopupComponent } from 'src/app/shared/components/popups/warning-delete-ticket-popup/warning-delete-ticket-popup.component';
import { TicketCalledPopupComponent } from 'src/app/shared/components/popups/ticket-called-popup/ticket-called-popup.component';
import { EmailSentPopupComponent } from '../components/popups/email-sent-popup/email-sent-popup.component';
import { ScannedLabNotFoundComponent } from '../components/popups/scanned-lab-not-found/scanned-lab-not-found.component';
import { InvalidLabQrComponent } from '../components/popups/invalid-lab-qr/invalid-lab-qr.component';
import { NoNearbyLabsComponent } from '../components/popups/no-nearby-labs/no-nearby-labs.component';
import { WrongIdComponent } from '../components/popups/wrong-id/wrong-id.component';
import { AppointmentInWrongKioskComponent } from '../components/popups/appointment-in-wrong-kiosk/appointment-in-wrong-kiosk.component';
import { KioskGroupNotFoundComponent } from '../components/popups/kiosk-group-not-found/kiosk-group-not-found.component';
import { ServiceNotFoundComponent } from '../components/popups/service-not-found/service-not-found.component';
import { AppointmentNotFoundComponent } from '../components/popups/appointment-not-found/appointment-not-found.component';

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
      case PopupValidDataTypes.Scanned_Qr_Not_Found:
        this.open(ScannedLabNotFoundComponent)
        break
      case PopupValidDataTypes.Invalid_Lab:
        this.open(InvalidLabQrComponent)
        break
      case PopupValidDataTypes.NoNearbyLabs:
        this.open(NoNearbyLabsComponent)
        break
      case PopupValidDataTypes.WrongID :
        this.open(WrongIdComponent)
        break
      case PopupValidDataTypes.AppointmentInWrongKiosk:
        this.open(AppointmentInWrongKioskComponent )
        break
      case PopupValidDataTypes.KioskGroupNotFound :
        this.open(KioskGroupNotFoundComponent)
        break
      case PopupValidDataTypes.ServiceNotFound :
        this.open(ServiceNotFoundComponent)
        break
      case PopupValidDataTypes.AppointmentNotFound:
        this.open(AppointmentNotFoundComponent)
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
