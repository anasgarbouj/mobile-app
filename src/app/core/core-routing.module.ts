import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LabsComponent } from './pages/labs/labs.component';
import { TicketDetailsComponent } from './pages/ticket-details/ticket-details.component';
import { CoreComponent } from './core.component';
import { IdentifyLabComponent } from './pages/identify-lab/identify-lab.component';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';

const routes: Routes = [
  {
    path: '',
    component: CoreComponent,
    children: [
      {
        path: 'access-denied',
        component: AccessDeniedComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'identify-lab',
        component: IdentifyLabComponent
      },
      {
        path: 'labs',
        component: LabsComponent
      },
      {
        path: 'lab/:ticket-id',
        component: TicketDetailsComponent
      },
      {
        path: 'appointment',
        loadChildren: () => import('../appointment/appointment.module').then(m => m.AppointmentModule)
      },
      {
        path: '**',
        redirectTo: '/home',
        pathMatch: 'full'
      }

    ]
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
