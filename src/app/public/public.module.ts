import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { LabsComponent } from './pages/labs/labs.component';
import { LabCardComponent } from './components/lab-card/lab-card.component';
import { IdentifyLabComponent } from './pages/identify-lab/identify-lab.component';
import { PublicComponent } from './public.component';
import { EmailConfirmationComponent } from './pages/email-confirmation/email-confirmation.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ServiceListComponent } from './pages/service-list/service-list.component';
import { AppointmentIdentificationComponent } from './pages/appointment-identification/appointment-identification.component';
import { SquareRoundedIconButtonComponent } from './components/square-rounded-icon-button/square-rounded-icon-button.component';
import { ServiceCardComponent } from './components/service-card/service-card.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from "../shared/filters/search.pipe";
import { CountDownTimeTrackerComponent } from './components/count-down-time-tracker/count-down-time-tracker.component';


@NgModule({
    declarations: [
        PublicComponent,
        HomeComponent,
        LabsComponent,
        LabCardComponent,
        IdentifyLabComponent,
        EmailConfirmationComponent,
        MainPageComponent,
        ServiceListComponent,
        AppointmentIdentificationComponent,
        SquareRoundedIconButtonComponent,
        ServiceCardComponent,
        CountDownTimeTrackerComponent
    ],
    imports: [
        CommonModule,
        PublicRoutingModule,
        SharedModule,
        FormsModule,
        SearchPipe
    ]
})
export class PublicModule { }
