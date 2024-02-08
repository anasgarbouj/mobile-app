import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScannerQRCodeResult } from 'ngx-scanner-qrcode';
import { catchError, map, of, take } from 'rxjs';
import { TicketServiceInfoMapper } from 'src/app/shared/commun/TicketServiceInfoMapper';
import { IAppointmentTicket } from 'src/app/shared/interfaces/appointment-ticket';
import { ILocation } from 'src/app/shared/interfaces/location';
import { ITicket } from 'src/app/shared/interfaces/ticket';
import { GeolocationService } from 'src/app/shared/services/geolocation.service';
import { PopupService } from 'src/app/shared/services/popup.service';
import { TicketsService } from 'src/app/shared/services/tickets.service';

@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdentificationComponent implements OnInit {

  appointmentId: string = "";
  cameraActive: boolean = false;

  private stopScanning: boolean = false;
  private kioskGroupId: number|null = null;
  private currentPosition :ILocation | null = null;
  private ticketServiceInfoMapper = new TicketServiceInfoMapper(this.popUpService)

  constructor(
    private _router: Router,
    private popUpService: PopupService,
    private route: ActivatedRoute ,
    private readonly ticketServices : TicketsService,
    private readonly geolocationService : GeolocationService

  ) {
    this.route.paramMap.subscribe(params => {
      this.kioskGroupId = params.get('kioskGroupId') ? Number(params.get('kioskGroupId')) : null;
    });
  }
  ngOnInit(): void {}

  public handle(action: any, fn: string): void {
    const playDeviceFacingBack = (devices: any[]) => {
      // front camera or back camera check here!
      const device = devices.find(f => (/back|rear|environment/gi.test(f.label)));
      action.playDevice(device ? device.deviceId : devices[0].deviceId);
    }

    if (fn === 'start') {
      action[fn](playDeviceFacingBack).subscribe((r: any) => console.log(fn, r), alert);
      this.cameraActive = true;
    } else {
      action[fn]().subscribe((r: any) => console.log(fn, r), alert);
      this.cameraActive = false;
    }
  }

  async handleEvent(event: ScannerQRCodeResult[]) {
    if (!this.stopScanning) {
      if (!this.kioskGroupId) {
        console.log("kioskGroupId value ERROR: ", this.kioskGroupId);
        return
      }
      console.log((event[0].value));
      this.stopScanning = !this.stopScanning;

      try {
        const position = await this.geolocationService.getCurrentPosition();
        console.log("Current user position is: ", position);
        this.currentPosition = position as ILocation;
      } catch (error) {
        console.log("Error getting current position", error);
      }


      const appointmentTicket: IAppointmentTicket = {
        kiosk_group_id: this.kioskGroupId,
        schedule_activity_filler_appointment_id: event[0].value,
        current_position : this.currentPosition
      };

      console.log("Appointment Ticket Object ---" , appointmentTicket);

      this.ticketServices.createTicketWithAppointment(appointmentTicket).pipe(
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

            this._router.navigate([`/email-confirmation/${ticket.ticket_id}/${this.kioskGroupId}`]);
          }
        }
        )
    }
  }

  async submitData() {
    console.log("TEST APPOINTMENT ID ---", this.appointmentId);
    if (!this.kioskGroupId) {
      console.log("kioskGroupId value ERROR: ", this.kioskGroupId);
      return
    }
    try {
      const position = await this.geolocationService.getCurrentPosition();
      console.log("Current user position is: ", position);
      this.currentPosition = position as ILocation;
    } catch (error) {
      console.log("Error getting current position", error);
    }

    const appointmentTicket: IAppointmentTicket = {
      kiosk_group_id: this.kioskGroupId,
      schedule_activity_filler_appointment_id: this.appointmentId,
      current_position : this.currentPosition
    };

    console.log("Appointment Ticket Object ---" , appointmentTicket);


    this.ticketServices.createTicketWithAppointment(appointmentTicket).pipe(
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

          this._router.navigate([`/email-confirmation/${ticket.ticket_id}/${this.kioskGroupId}`]);
        }
      }
      )
    //clear field after sending data
    this.appointmentId = ""

  }

}
