import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './components/header/header.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ProximityPopupComponent } from './components/popups/proximity-popup/proximity-popup.component';
import { DividerComponent } from './components/divider/divider.component';
import { EmailSentPopupComponent } from './components/popups/email-sent-popup/email-sent-popup.component';
import { TicketCalledPopupComponent } from './components/popups/ticket-called-popup/ticket-called-popup.component';
import { TicketSuccessPopupComponent } from './components/popups/ticket-success-popup/ticket-success-popup.component';
import { WarningDeleteTicketPopupComponent } from './components/popups/warning-delete-ticket-popup/warning-delete-ticket-popup.component';
import { LabProximityPopupComponent } from './components/popups/lab-proximity-popup/lab-proximity-popup.component';
import { LOAD_WASM, NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import {HttpClientModule} from '@angular/common/http';
import { InvalidLabQrComponent } from './components/popups/invalid-lab-qr/invalid-lab-qr.component';
import { ScannedLabNotFoundComponent } from './components/popups/scanned-lab-not-found/scanned-lab-not-found.component';
import { NoNearbyLabsComponent } from './components/popups/no-nearby-labs/no-nearby-labs.component';
import { WrongIdComponent } from './components/popups/wrong-id/wrong-id.component';
import { ServiceNotFoundComponent } from './components/popups/service-not-found/service-not-found.component';
import { KioskGroupNotFoundComponent } from './components/popups/kiosk-group-not-found/kiosk-group-not-found.component';
import { AppointmentInWrongKioskComponent } from './components/popups/appointment-in-wrong-kiosk/appointment-in-wrong-kiosk.component';
import { AppointmentAlreadyTreatedComponent } from './components/popups/appointment-already-treated/appointment-already-treated.component';
import { AppointmentNotFoundComponent } from './components/popups/appointment-not-found/appointment-not-found.component';
import { EmailNotSentComponent } from './components/popups/email-not-sent/email-not-sent.component';
import { FormsModule } from '@angular/forms';

LOAD_WASM().subscribe();

@NgModule({
  declarations: [
    HeaderComponent,
    SearchBarComponent,
    DividerComponent,
    // Popups
    EmailSentPopupComponent,
    LabProximityPopupComponent,
    ProximityPopupComponent,
    TicketCalledPopupComponent,
    TicketSuccessPopupComponent,
    WarningDeleteTicketPopupComponent,
    InvalidLabQrComponent,
    ScannedLabNotFoundComponent,
    NoNearbyLabsComponent,
    WrongIdComponent,
    ServiceNotFoundComponent,
    KioskGroupNotFoundComponent,
    AppointmentInWrongKioskComponent,
    AppointmentAlreadyTreatedComponent,
    AppointmentNotFoundComponent,
    EmailNotSentComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot({
      innerHTMLTemplatesEnabled: true
    })
  ],
  exports: [
    HeaderComponent,
    SearchBarComponent,
    DividerComponent,
    IonicModule,
    NgxScannerQrcodeModule
  ]
})
export class SharedModule { }
