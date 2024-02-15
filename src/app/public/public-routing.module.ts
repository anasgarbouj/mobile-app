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

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      //Default routing
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },

      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'identify-lab',
        component: IdentifyLabComponent,
        canActivate : [geolocationGuard]
      },
      {
        path: 'labs',
        component: LabsComponent,
        canActivate : [geolocationGuard]
      },
      {
        path: 'main-app/:configId',
        component: MainPageComponent,
        canActivate : [LabGuard, geolocationGuard]
      },
      {
        path: 'service-list/:configId',
        component: ServiceListComponent,
        canActivate : [LabGuard, geolocationGuard]
      },
      {
        path: 'identify-appointment',
        component: AppointmentIdentificationComponent,
        canActivate : [LabGuard, geolocationGuard]
      },
      {
        path: 'email-confirmation/:ticketId',
        component: EmailConfirmationComponent,
        canActivate : [LabGuard, geolocationGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
