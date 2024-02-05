import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ScannerQRCodeResult } from 'ngx-scanner-qrcode';
import { catchError, map, of, take } from 'rxjs';
import { IAppointmentTicket } from 'src/app/shared/interfaces/appointment-ticket';
import { TicketsService } from 'src/app/shared/services/tickets.service';

@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdentificationComponent {

  appointmentID : string = "" ;
  private stopScanning : boolean = false ;
  private readonly ticketServices = inject(TicketsService);
  private kioskGroupId : number = 0 ;

  constructor(private _router: Router) {
    const kioskId = this._router.getCurrentNavigation()?.extras.state?.['kioskId'];
    console.log("Appointment page - KIOSK GROUP ID :", kioskId);
    this.kioskGroupId = kioskId;
  }

  public handle(action: any, fn: string): void {
    const playDeviceFacingBack = (devices: any[]) => {
      // front camera or back camera check here!
      const device = devices.find(f => (/back|rear|environment/gi.test(f.label)));
      action.playDevice(device ? device.deviceId : devices[0].deviceId);
    }

    if (fn === 'start') {
      action[fn](playDeviceFacingBack).subscribe((r: any) => console.log(fn, r), alert);
    } else {
      action[fn]().subscribe((r: any) => console.log(fn, r), alert);
    }
  }




  handleEvent(event : ScannerQRCodeResult[]){
    if(!this.stopScanning) {
      console.log((event[0].value));
      this.stopScanning = ! this.stopScanning ;
      this._router.navigate(["/labs"])
    }
  }

  submitData(){
    console.log("TEST APPOINTMENT ID ---",this.appointmentID);

    const appointmentTicket: IAppointmentTicket = {
      kiosk_group_id: this.kioskGroupId,
      schedule_activity_filler_appointment_id: this.appointmentID
    };

    this.ticketServices.createTicketWithAppointment(appointmentTicket) .pipe(
      take(1),
      map(res => {
        console.log(res);
        return res;
      }),
      catchError(error => {
        console.error('Error creating ticket:', error);
        return of(null);
      })
    )
    .subscribe((ticketResponse) => {
        console.log("Ticket Response:", ticketResponse);
     }
    )
    //clear field after sending data
    this.appointmentID=""

  }

}
