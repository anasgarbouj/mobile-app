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

@NgModule({
  declarations: [
    HomeComponent,
    LabsComponent,
    TicketDetailsComponent,
    LoaderSpinnerComponent,
    CoreComponent,
    LabCardComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    CoreRoutingModule
  ],
})
export class CoreModule { }
