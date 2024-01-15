import { NgModule } from '@angular/core';
import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';
import { CoreComponent } from './core.component';

@NgModule({
  declarations: [
    CoreComponent,
    AccessDeniedComponent,
  ],
  imports: [
    SharedModule,
    CoreRoutingModule
  ],
})
export class CoreModule { }
