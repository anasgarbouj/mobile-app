import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { LabsComponent } from './pages/labs/labs.component';
import { TicketDetailsComponent } from './pages/ticket-details/ticket-details.component';
import { LoaderSpinnerComponent } from './components/loader-spinner/loader-spinner.component';
import { LabCardComponent } from './components/lab-card/lab-card.component';
import { IdentifyLabComponent } from './pages/identify-lab/identify-lab.component';
import { PublicComponent } from './public.component';
import { EmailConfirmationComponent } from './pages/email-confirmation/email-confirmation.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ServiceListComponent } from './pages/service-list/service-list.component';
import { IdentificationComponent } from './pages/identification/identification.component';
import { SquareRoundedIconButtonComponent } from './components/square-rounded-icon-button/square-rounded-icon-button.component';
import { ServiceCardComponent } from './components/service-card/service-card.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PublicComponent,
    HomeComponent,
    LabsComponent,
    TicketDetailsComponent,
    LoaderSpinnerComponent,
    LabCardComponent,
    IdentifyLabComponent,
    EmailConfirmationComponent,
    MainPageComponent,
    ServiceListComponent,
    IdentificationComponent,
    SquareRoundedIconButtonComponent,
    ServiceCardComponent,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule,
  ]
})
export class PublicModule { }