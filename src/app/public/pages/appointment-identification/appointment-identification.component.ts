import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ScannerQRCodeResult } from 'ngx-scanner-qrcode';
import { catchError, map, of, take } from 'rxjs';
import { TicketServiceInfoMapper } from 'src/app/shared/commun/TicketServiceInfoMapper';
import { IAppointmentTicket } from 'src/app/shared/interfaces/appointment-ticket';
import { ITicket } from 'src/app/shared/interfaces/ticket';
import { PopupService } from 'src/app/shared/services/popup.service';
import { TicketsService } from 'src/app/shared/services/tickets.service';
import { imageSelect } from 'src/app/shared/types/image-switch';

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
  private ticketServiceInfoMapper = new TicketServiceInfoMapper(this.popupService)

  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private readonly ticketServices: TicketsService,
    private popupService: PopupService,
    private translate: TranslateService
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
      this.stopScanning = true;

      // TODO: REPETTIVE CODE 1
      const appointmentTicket: IAppointmentTicket = {
        kiosk_group_id: this.kioskGroupId,
        schedule_activity_filler_appointment_id: event[0].value
      };

      console.log("Appointment Ticket Object ---", appointmentTicket);

      this.ticketServices.createTicketWithAppointment(appointmentTicket)
      .pipe(take(1))
      .subscribe({
        next: (ticketResponse) => {
          if (ticketResponse && ticketResponse.info) {
            this.ticketServiceInfoMapper.mapSuccessInfo(ticketResponse.info);
            const ticket = ticketResponse.data as ITicket
            console.log("Appointment Ticket ID to Send to email page : ", ticket.ticket_id);
            this._router.navigate([`/email-confirmation/${ticket.ticket_id}/${this.kioskGroupId}`]);
          }
        }, error: async (err) => {
          const info = err.error?.info ? err.error.info : "";
          const translatedErrorMessage = info ? this.translate.instant(`POPUP.ERROR_MESSAGES.${info}`) : this.translate.instant("POPUP.ERROR_MESSAGES.DEFAULT")
          const errorImageSrc = imageSelect(info)
          await this.popupService.openPopup(translatedErrorMessage, errorImageSrc);
          this.stopScanning = false;
        }
      })
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


    this.ticketServices.createTicketWithAppointment(appointmentTicket)
      .pipe(take(1))
      .subscribe({
        next: (ticketResponse) => {
          if (ticketResponse && ticketResponse.info) {
            this.ticketServiceInfoMapper.mapSuccessInfo(ticketResponse.info);
            const ticket = ticketResponse.data as ITicket
            console.log("Appointment Ticket ID to Send to email page : ", ticket.ticket_id);
            this._router.navigate([`/email-confirmation/${ticket.ticket_id}/${this.kioskGroupId}`]);
            //clear field after sending data
            this.appointmentId = ""
          }
        }, error: async (err) => {
          const info = err.error?.info ? err.error.info : "";
          const translatedErrorMessage = info ? this.translate.instant(`POPUP.ERROR_MESSAGES.${info}`) : this.translate.instant("POPUP.ERROR_MESSAGES.DEFAULT")
          const errorImageSrc = imageSelect(info)
          await this.popupService.openPopup(translatedErrorMessage, errorImageSrc);
          this.stopScanning = false;
        }
      })
  }

}
