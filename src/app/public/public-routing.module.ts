import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { IdentifyLabComponent } from './pages/identify-lab/identify-lab.component';
import { LabsComponent } from './pages/labs/labs.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ServiceListComponent } from './pages/service-list/service-list.component';
import { AppointmentIdentificationComponent } from './pages/identification/appointment-identification.component';
import { EmailConfirmationComponent } from './pages/email-confirmation/email-confirmation.component';
import { PublicComponent } from './public.component';
import { geolocationGuard } from '../shared/guards/geolocation.guard';
import { AccessDeniedComponent } from '../core/pages/access-denied/access-denied.component';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
   // canActivate : [geolocationGuard],
    children: [
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
        path: 'main-app/:kioskGroupId/:configId',
        component: MainPageComponent,
        canActivate : [geolocationGuard]
      },
      {
        path: 'service-list/:kioskGroupId/:configId',
        component: ServiceListComponent,
        canActivate : [geolocationGuard]
      },
      {
        path: 'identify-appointment/:kioskGroupId',
        component: AppointmentIdentificationComponent,
        canActivate : [geolocationGuard]
      },
      {
        path: 'email-confirmation/:ticketId/:kioskGroupId',
        component: EmailConfirmationComponent
      },
      {
        path: 'access-denied',
        component: AccessDeniedComponent
      },


      //Default routing
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
