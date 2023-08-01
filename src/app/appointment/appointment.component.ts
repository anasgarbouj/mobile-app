import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppointmentComponent {

}
