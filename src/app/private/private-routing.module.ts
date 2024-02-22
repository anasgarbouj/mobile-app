import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateComponent } from './private.component';
import { TicketDetailsComponent } from './pages/ticket-details/ticket-details.component';
import { CalledTicketComponent } from './pages/called-ticket/called-ticket.component';
import { AuthGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'private',
    component: PrivateComponent,
    children: [
      {
        path: ':ticketId',
        component: TicketDetailsComponent
      },
      {
        path: 'ticket/:ticketId',
        canActivate: [AuthGuard],
        component: TicketDetailsComponent
      },
      {
        path: 'ticket/:ticketId/:status',
        component: CalledTicketComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
