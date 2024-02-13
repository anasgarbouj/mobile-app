import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScannerQRCodeResult } from 'ngx-scanner-qrcode';
import { catchError, map, of, take } from 'rxjs';
import { TicketServiceInfoMapper } from 'src/app/shared/commun/TicketServiceInfoMapper';
import { IAppointmentTicket } from 'src/app/shared/interfaces/appointment-ticket';
import { ITicket } from 'src/app/shared/interfaces/ticket';
import { PopupService } from 'src/app/shared/services/popup.service';
import { TicketsService } from 'src/app/shared/services/tickets.service';

@Component({
  selector: 'app-appointment-identification',
  templateUrl: './appointment-identification.component.html',
  styleUrls: ['./appointment-identification.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppointmentIdentificationComponent implements OnInit {

  appointmentId: string = "";
  cameraActive: boolean = false;

  private stopScanning: boolean = false;
  private kioskGroupId: number | null = null;
  private ticketServiceInfoMapper = new TicketServiceInfoMapper(this.popUpService)

  constructor(
    private _router: Router,
    private popUpService: PopupService,
    private route: ActivatedRoute,
    private readonly ticketServices: TicketsService,
  ) {
    this.route.paramMap.subscribe(params => {
      this.kioskGroupId = params.get('kioskGroupId') ? Number(params.get('kioskGroupId')) : null;
    });
  }
  ngOnInit(): void { }

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

  handleEvent(event: ScannerQRCodeResult[]) {
    if (!this.stopScanning) {
      if (!this.kioskGroupId) {
        console.log("kioskGroupId value ERROR: ", this.kioskGroupId);
        return
      }
      console.log((event[0].value));
      this.stopScanning = !this.stopScanning;

      // TODO: REPETTIVE CODE 1
      const appointmentTicket: IAppointmentTicket = {
        kiosk_group_id: this.kioskGroupId,
        schedule_activity_filler_appointment_id: event[0].value
      };

      console.log("Appointment Ticket Object ---", appointmentTicket);

      this.ticketServices.createTicketWithAppointment(appointmentTicket).pipe(
        take(1),
        map(res => {
          console.log(res);
          return res;
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

  submitData() {
    console.log("TEST APPOINTMENT ID ---", this.appointmentId);
    if (!this.kioskGroupId) {
      // TODO: add popup
      console.log("kioskGroupId value ERROR: ", this.kioskGroupId);
      return
    }

    // TODO: REPETTIVE CODE 2
    const appointmentTicket: IAppointmentTicket = {
      kiosk_group_id: this.kioskGroupId,
      schedule_activity_filler_appointment_id: this.appointmentId,
    };

    console.log("Appointment Ticket Object ---", appointmentTicket);


    this.ticketServices.createTicketWithAppointment(appointmentTicket).pipe(
      take(1),
      map(res => {
        console.log(res);
        return res;
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
