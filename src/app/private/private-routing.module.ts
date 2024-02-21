import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateComponent } from './private.component';
import { TicketDetailsComponent } from './pages/ticket-details/ticket-details.component';
import { CalledTicketComponent } from './pages/called-ticket/called-ticket.component';

const routes: Routes = [
  {
    path: 'private',
    component: PrivateComponent,
    children: [
      {
        path: 'ticket/:ticket-id',
        component: TicketDetailsComponent
      },
      {
        path: 'ticket/:ticket-id/:status',
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
