import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentRoutingModule } from './appointment-routing.module';
import { EmailConfirmationComponent } from './pages/email-confirmation/email-confirmation.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ServiceListComponent } from './pages/service-list/service-list.component';
import { IdentificationComponent } from './pages/identification/identification.component';
import { AppointmentComponent } from './appointment.component';
import { SharedModule } from '../shared/shared.module';
import { SquareRoundedIconButtonComponent } from './components/square-rounded-icon-button/square-rounded-icon-button.component';


@NgModule({
  declarations: [
    EmailConfirmationComponent,
    MainPageComponent,
    ServiceListComponent,
    IdentificationComponent,
    AppointmentComponent,
    SquareRoundedIconButtonComponent
  ],
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    SharedModule
  ]
})
export class AppointmentModule { }
