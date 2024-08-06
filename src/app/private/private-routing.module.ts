import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateComponent } from './private.component';
import { TicketDetailsComponent } from './pages/ticket-details/ticket-details.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { PlatformCompatibilityGuard } from '../shared/guards/platform.guard';

const routes: Routes = [
  {
    path: 'private',
    component: PrivateComponent,
    children: [
      {
        path: 'ticket',
        component: TicketDetailsComponent,
        // canActivate: [PlatformCompatibilityGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
