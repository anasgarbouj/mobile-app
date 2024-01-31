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
    WarningDeleteTicketPopupComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
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
