import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { LabsComponent } from './pages/labs/labs.component';
import { TicketDetailsComponent } from './pages/ticket-details/ticket-details.component';
import { SharedModule } from '../shared/shared.module';
import { LoaderSpinnerComponent } from './components/loader-spinner/loader-spinner.component';
import { CoreComponent } from './core.component';
import { LabCardComponent } from './components/lab-card/lab-card.component';
import { IdentifyLabComponent } from './pages/identify-lab/identify-lab.component';
import { LabProximityPopupComponent } from './components/lab-proximity-popup/lab-proximity-popup.component';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';
<<<<<<< HEAD
import { TicketCalledPopupComponent } from './components/ticket-called-popup/ticket-called-popup.component';
=======
import { CalledTicketComponent } from './pages/called-ticket/called-ticket.component';
>>>>>>> cb9d4011bf5c90301b41f9a90615c07c664268a2

@NgModule({
  declarations: [
    HomeComponent,
    LabsComponent,
    TicketDetailsComponent,
    LoaderSpinnerComponent,
    CoreComponent,
    LabCardComponent,
    IdentifyLabComponent,
    LabProximityPopupComponent,
    AccessDeniedComponent,
<<<<<<< HEAD
    TicketCalledPopupComponent
=======
    CalledTicketComponent
>>>>>>> cb9d4011bf5c90301b41f9a90615c07c664268a2
  ],
  imports: [
    SharedModule,
    CommonModule,
    CoreRoutingModule
  ],
})
export class CoreModule { }
