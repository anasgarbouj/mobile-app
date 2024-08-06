import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { CheckGpsPermissionComponent } from './pages/check-gps-permission/check-gps-permission.component';
import { LabsComponent } from './pages/labs/labs.component';
import { LabCardComponent } from './components/lab-card/lab-card.component';
import { IdentifyLabComponent } from './pages/identify-lab/identify-lab.component';
import { PublicComponent } from './public.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ServiceListComponent } from './pages/service-list/service-list.component';
import { AppointmentIdentificationComponent } from './pages/appointment-identification/appointment-identification.component';
import { SquareRoundedIconButtonComponent } from './components/square-rounded-icon-button/square-rounded-icon-button.component';
import { ServiceCardComponent } from './components/service-card/service-card.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from "../shared/pipes/search.pipe";
import { MainMenuPageComponent } from './pages/main-menu/main-menu-page.component';


@NgModule({
    declarations: [
        PublicComponent,
        CheckGpsPermissionComponent,
        LabsComponent,
        LabCardComponent,
        IdentifyLabComponent,
        MainPageComponent,
        ServiceListComponent,
        AppointmentIdentificationComponent,
        SquareRoundedIconButtonComponent,
        ServiceCardComponent,
        MainMenuPageComponent
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
