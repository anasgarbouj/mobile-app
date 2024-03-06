import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './components/header/header.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MessagePopupComponent } from './components/popups/message-popup/message-popup.component';
import { DividerComponent } from './components/divider/divider.component';
import { LOAD_WASM, NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderSpinnerComponent } from './components/loader-spinner/loader-spinner.component';
import { TwoDigitNumberPipe } from './filters/twoDigitNumber.pipe';

LOAD_WASM().subscribe();

@NgModule({
  declarations: [
    HeaderComponent,
    SearchBarComponent,
    DividerComponent,
    // Popups
    MessagePopupComponent,
    LoaderSpinnerComponent,
    TwoDigitNumberPipe,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule,
    FormsModule,
    NgbPaginationModule,
    IonicModule.forRoot({
      innerHTMLTemplatesEnabled: true
    })
  ],
  exports: [
    HeaderComponent,
    SearchBarComponent,
    DividerComponent,
    IonicModule,
    NgxScannerQrcodeModule,
    TranslateModule,
    NgbPaginationModule,
    LoaderSpinnerComponent,
    FormsModule,
    TwoDigitNumberPipe,
  ]
})
export class SharedModule { }
