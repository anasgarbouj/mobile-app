import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { IdentifyLabComponent } from './pages/identify-lab/identify-lab.component';
import { LabsComponent } from './pages/labs/labs.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ServiceListComponent } from './pages/service-list/service-list.component';
import { AppointmentIdentificationComponent } from './pages/appointment-identification/appointment-identification.component';
import { EmailConfirmationComponent } from './pages/email-confirmation/email-confirmation.component';
import { PublicComponent } from './public.component';
import { geolocationGuard } from '../shared/guards/geolocation.guard';
import { LabGuard } from '../shared/guards/lab.guard';
import { AuthGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: '',
        component: EmailConfirmationComponent
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'identify-lab',
        component: IdentifyLabComponent,
        canActivate: [AuthGuard, geolocationGuard]
      },
      {
        path: 'labs',
        component: LabsComponent,
        canActivate: [AuthGuard, geolocationGuard]
      },
      {
        path: 'main-app/:configId',
        component: MainPageComponent,
        canActivate: [AuthGuard, LabGuard, geolocationGuard]
      },
      {
        path: 'service-list/:configId',
        component: ServiceListComponent,
        canActivate: [AuthGuard, LabGuard, geolocationGuard]
      },
      {
        path: 'identify-appointment',
        component: AppointmentIdentificationComponent,
        canActivate: [AuthGuard, LabGuard, geolocationGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
