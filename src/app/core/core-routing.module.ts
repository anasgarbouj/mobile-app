import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreComponent } from './core.component';
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
        path: '',
        loadChildren: () => import('../public/public.module').then(m => m.PublicModule)
      },
      {
        path: '',
        loadChildren: () => import('../private/private.module').then(m => m.PrivateModule)
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
