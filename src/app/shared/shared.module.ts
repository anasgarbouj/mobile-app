import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './components/header/header.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ProximityPopupComponent } from './components/proximity-popup/proximity-popup.component';
import { DividerComponent } from './components/divider/divider.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SearchBarComponent,
    ProximityPopupComponent,
    DividerComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot({
      innerHTMLTemplatesEnabled: true
    })
  ],
  exports: [
    IonicModule,
    HeaderComponent,
    SearchBarComponent,
    ProximityPopupComponent,
    DividerComponent,

  ]
})
export class SharedModule { }
