import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ScannerQRCodeResult } from 'ngx-scanner-qrcode';
import { take } from 'rxjs';
import { IAppointmentTicket } from 'src/app/shared/interfaces/appointment-ticket';
import { ITicket } from 'src/app/shared/interfaces/ticket';
import { PopupService } from 'src/app/shared/services/popup.service';
import { TicketsService } from 'src/app/shared/services/tickets.service';
import { errorImageSelect, successImageSelect } from 'src/app/shared/types/image-switch';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';
import { LabsService } from 'src/app/shared/services/labs.service';

@Component({
  selector: 'app-appointment-identification',
  templateUrl: './appointment-identification.component.html',
  styleUrls: ['./appointment-identification.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentIdentificationComponent implements OnInit {
  @ViewChild('action') action!: NgxScannerQrcodeComponent;
  appointmentId: string = '';
  cameraActive: boolean = false;

  private stopScanning: boolean = false;

  constructor(
    private readonly ticketServices: TicketsService,
    private popupService: PopupService,
    private translate: TranslateService,
    private labsService: LabsService
  ) { }

  ngOnInit(): void { }

  public handle(action: any, fn: string): void {
    const playDeviceFacingBack = (devices: any[]) => {
      // front camera or back camera check here!
      const device = devices.find((f) =>
        /back|rear|environment/gi.test(f.label)
      );
      action.playDevice(device ? device.deviceId : devices[0].deviceId);
    };

    if (fn === 'start') {
      action[fn](playDeviceFacingBack).subscribe(
        (r: any) => console.log(fn, r),
        alert
      );
      this.cameraActive = true;
    }
    // console.log(fn, this.cameraActive);

    if (fn === 'stop') {
      action[fn]().subscribe((r: any) => console.log(fn, r), alert);
      this.cameraActive = false;
    }
  }

  handleEvent(event: ScannerQRCodeResult[]) {
    if (!this.stopScanning) {
      this.stopScanning = true;

      // TODO: REPETTIVE CODE 1
      const appointmentTicket: IAppointmentTicket = {
        schedule_activity_filler_appointment_id: event[0].value,
      kiosk_group_id : this.labsService.getKioskGroupIdValue()

      };

      // console.log('Appointment Ticket Object ---', appointmentTicket);

      this.ticketServices
        .createTicketWithAppointment(appointmentTicket)
        .pipe(take(1))
        .subscribe({
          next: async (ticketResponse: any) => {
            if (ticketResponse && ticketResponse.info) {
              const ticket = ticketResponse.data as ITicket
              const info = ticketResponse.info;
              const translatedMessage = info
                ? this.translate.instant(`POPUP.SUCCESS_MESSAGES.${info}`)
                : this.translate.instant('POPUP.SUCCESS_MESSAGES.DEFAULT');
              const ImageSrc = successImageSelect(info);
              await this.popupService.openPopup(
                translatedMessage,
                ImageSrc
              );
              window.open(ticket.redirection_link, "_self");
            }
          },
          error: async (err) => {
            const info = err.error?.info ? err.error.info : '';
            const translatedErrorMessage = info
              ? this.translate.instant(`POPUP.ERROR_MESSAGES.${info}`)
              : this.translate.instant('POPUP.ERROR_MESSAGES.DEFAULT');
            const errorImageSrc = errorImageSelect(info);
            await this.popupService.openPopup(
              translatedErrorMessage,
              errorImageSrc
            );
            this.stopScanning = false;
          },
        });
    }
  }

  submitData() {
    // console.log("TEST APPOINTMENT ID ---", this.appointmentId);
    // TODO: REPETTIVE CODE 2
    const appointmentTicket: IAppointmentTicket = {
      schedule_activity_filler_appointment_id: this.appointmentId,
      kiosk_group_id : this.labsService.getKioskGroupIdValue()
    };

    // console.log('Appointment Ticket Object ---', appointmentTicket);

    this.ticketServices
      .createTicketWithAppointment(appointmentTicket)
      .pipe(take(1))
      .subscribe({
        next: async (ticketResponse) => {
          if (ticketResponse && ticketResponse.info) {
            const ticket = ticketResponse.data as ITicket
            const info = ticketResponse.info;
            const translatedMessage = info
              ? this.translate.instant(`POPUP.SUCCESS_MESSAGES.${info}`)
              : this.translate.instant('POPUP.SUCCESS_MESSAGES.DEFAULT');
            const ImageSrc = successImageSelect(info);
            await this.popupService.openPopup(
              translatedMessage,
              ImageSrc
            );
            window.open(ticket.redirection_link, "_self");
          }
        },
        error: async (err) => {
          this.stopScanning = false;
        },
      });
  }

  ngOnDestroy() {
    // console.log('Closing camera ...');
    if (this.cameraActive) {
      this.action["stop"]().subscribe({
        next: (res) => {
          this.cameraActive = false;
          this.stopScanning = true;
        }
      });
    }
  }
}
