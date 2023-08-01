import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { IdentificationComponent } from './pages/identification/identification.component';
import { ServiceListComponent } from './pages/service-list/service-list.component';
import { EmailConfirmationComponent } from './pages/email-confirmation/email-confirmation.component';
import { AppointmentComponent } from './appointment.component';

const routes: Routes = [

  {
    path: '',
    component: AppointmentComponent,
    children: [
      {
        path: '',
        component: MainPageComponent
      },
      {
        path: 'service-list',
        component: ServiceListComponent
      },
      {
        path: 'identify',
        component: IdentificationComponent,
        children: [
          {
            path: 'email-confirmation',
            component: EmailConfirmationComponent
          }
        ]
      },
      {
        path: '**',
        redirectTo: 'with',
        pathMatch: 'full'
      }

    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }
