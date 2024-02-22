import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { CalledTicketComponent } from './pages/called-ticket/called-ticket.component';
import { TicketDetailsComponent } from './pages/ticket-details/ticket-details.component';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PrivateComponent,
    TicketComponent,
    CalledTicketComponent,
    TicketDetailsComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    IonicModule,
    SharedModule
  ]
})
export class PrivateModule { }
