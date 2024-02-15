import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ScannerQRCodeResult } from 'ngx-scanner-qrcode';
import { map, take } from 'rxjs';
import { ILab } from 'src/app/shared/interfaces/Lab';
import { LabsService } from 'src/app/shared/services/labs.service';
import { PopupService } from 'src/app/shared/services/popup.service';
import { errorImageSelect } from 'src/app/shared/types/image-switch';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';

@Component({
  selector: 'app-identify-lab',
  templateUrl: './identify-lab.component.html',
  styleUrls: ['./identify-lab.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdentifyLabComponent implements OnInit {
  @ViewChild('action') action!: NgxScannerQrcodeComponent;
  cameraActive: boolean = false;
  private stopScanning: boolean = false;

  constructor(
    private _router: Router,
    private readonly labsService: LabsService,
    private popupService: PopupService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void { }

  navigateToLabs() {
    console.log('Navigating to labs page ...');
    this._router.navigate(['/labs'], { replaceUrl: true });
  }

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
    console.log(fn, this.cameraActive);

    if (fn === 'stop') {
      action[fn]().subscribe((r: any) => console.log(fn, r), alert);
      this.cameraActive = false;
    }
  }

  handleEvent(event: ScannerQRCodeResult[]) {
    if (!this.stopScanning) {
      this.stopScanning = true;
      this.labsService
        .fetchLabsByQrCode(event[0].value)
        .pipe(
          take(1),
          map((res) => {
            return { info: res.info, data: res.data };
          })
        )
        .subscribe({
          next: (response) => {
            const lab = response.data as ILab[];
            this.labsService.setKioskGroupId(lab[0].kiosk_group_id.toString())
            this._router.navigate([
              `/main-app/${lab[0].configuration}`,
            ], { replaceUrl: true });
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

  ngOnDestroy() {
    console.log('Closing camera ...');
    if(this.cameraActive){
      this.action["stop"]().subscribe({
        next: (res) => {
          this.cameraActive = false;
          this.stopScanning = true;
        }
      });
    }
  }
}
