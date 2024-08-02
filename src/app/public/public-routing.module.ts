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
import { PlatformCompatibilityGuard } from '../shared/guards/platform.guard';
import { MainMenuPageComponent } from './pages/main-menu/main-menu-page.component';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: '',
        component: MainMenuPageComponent,
        canActivate: [PlatformCompatibilityGuard]
      },
      {
        path: 'main-menu',
        component: MainMenuPageComponent,
        canActivate: [PlatformCompatibilityGuard]
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [geolocationGuard,PlatformCompatibilityGuard]
      },
      {
        path: 'identify-lab',
        component: IdentifyLabComponent,
        canActivate: [geolocationGuard]
      },
      {
        path: 'labs',
        component: LabsComponent,
        canActivate: [geolocationGuard]
      },
      {
        path: 'main-app/:configId',
        component: MainPageComponent,
        canActivate: [LabGuard, geolocationGuard]
      },
      {
        path: 'service-list/:configId',
        component: ServiceListComponent,
        canActivate: [LabGuard, geolocationGuard]
      },
      {
        path: 'identify-appointment',
        component: AppointmentIdentificationComponent,
        canActivate: [LabGuard, geolocationGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
