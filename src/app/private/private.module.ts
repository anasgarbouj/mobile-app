import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { TicketDetailsComponent } from './pages/ticket-details/ticket-details.component';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';
import { CountDownTimeTrackerComponent } from './components/count-down-time-tracker/count-down-time-tracker.component';


@NgModule({
  declarations: [
    PrivateComponent,
    TicketComponent,
    TicketDetailsComponent,
    CountDownTimeTrackerComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    IonicModule,
    SharedModule
  ]
})
export class PrivateModule { }
