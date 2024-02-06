import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ScannerQRCodeResult } from 'ngx-scanner-qrcode';
import { catchError, map, of, take } from 'rxjs';
import { TicketServiceInfoMapper } from 'src/app/shared/commun/TicketServiceInfoMapper';
import { IAppointmentTicket } from 'src/app/shared/interfaces/appointment-ticket';
import { ITicket } from 'src/app/shared/interfaces/ticket';
import { PopupService } from 'src/app/shared/services/popup.service';
import { TicketsService } from 'src/app/shared/services/tickets.service';
import { PopupValidDataTypes } from 'src/app/shared/types/PopupValidDataTypes';

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
  private ticketServiceInfoMapper = new TicketServiceInfoMapper(this.popUpService)
  private kioskGroupId : number = 0 ;

  constructor(private _router: Router , private popUpService: PopupService) {
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
      const appointmentTicket: IAppointmentTicket = {
        kiosk_group_id: this.kioskGroupId,
        schedule_activity_filler_appointment_id: event[0].value
      };
      this.ticketServices.createTicketWithAppointment(appointmentTicket) .pipe(
        take(1),
        map(res => {
          console.log(res);
          return res;
        }),
        catchError(error => {
          console.error('Error creating ticket:', error);
          console.error('Error Info:', error.error.info);
          this.ticketServiceInfoMapper.mapErrorInfo(error.error.info)
          return of(null);
        })
      )
      .subscribe((ticketResponse) => {
        console.log("Ticket Response:", ticketResponse);
        if (ticketResponse && ticketResponse.info) {
          this.ticketServiceInfoMapper.mapSuccessInfo(ticketResponse.info);
          const ticket = ticketResponse.data as ITicket
          console.log("Appointment Ticket ID to Send to email page : ", ticket.ticket_id);

          this._router.navigate(["/email-confirmation"], {state : {ticketId : ticket.ticket_id}});
       }
      }
      )

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
        console.error('Error Info:', error.error.info);
        this.ticketServiceInfoMapper.mapErrorInfo(error.error.info)
        return of(null);
      })
    )
    .subscribe((ticketResponse) => {
        console.log("Ticket Response:", ticketResponse);
        if (ticketResponse && ticketResponse.info) {
          this.ticketServiceInfoMapper.mapSuccessInfo(ticketResponse.info);
          const ticket = ticketResponse.data as ITicket
          console.log("Appointment Ticket ID to Send to email page : ", ticket.ticket_id);

          this._router.navigate(["/email-confirmation"], {state : {ticketId : ticket.ticket_id}});
        }
     }
    )
    //clear field after sending data
    this.appointmentID=""

  }



}
