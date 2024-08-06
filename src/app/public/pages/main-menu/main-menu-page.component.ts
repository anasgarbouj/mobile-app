import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ScannerQRCodeResult } from 'ngx-scanner-qrcode';
import { map, take } from 'rxjs';
import { ILab } from 'src/app/shared/interfaces/Lab';
import { LabsService } from 'src/app/shared/services/labs.service';
import { PopupService } from 'src/app/shared/services/popup.service';
import { errorImageSelect } from 'src/app/shared/types/image-switch';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';

@Component({
  selector: 'app-main-menu-page',
  templateUrl: './main-menu-page.component.html',
  styleUrls: ['./main-menu-page.component.css'],
})
export class MainMenuPageComponent implements OnInit, OnDestroy {
  @ViewChild('scanner1') scanner1!: NgxScannerQrcodeComponent;
  @ViewChild('scanner2') scanner2!: NgxScannerQrcodeComponent;

  cameraActive1: boolean = false;
  cameraActive2: boolean = false;

  private stopScanning1: boolean = false;
  private stopScanning2: boolean = false;

  constructor(
    private _router: Router,
    private readonly labsService: LabsService,
    private popupService: PopupService,
    private translate: TranslateService
  ) { 
  }

  ngOnInit() { 
  }

  public handle(action: NgxScannerQrcodeComponent, fn: string, scannerId: number): void {
    const playDeviceFacingBack = (devices: any[]) => {
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
      if (scannerId === 1) {
        this.cameraActive1 = true;
      } else if (scannerId === 2) {
        this.cameraActive2 = true;
      }
    }
    if (fn === 'stop') {
      action[fn]().subscribe((r: any) => console.log(fn, r), alert);
      if (scannerId === 1) {
        this.cameraActive1 = false;
      } else if (scannerId === 2) {
        this.cameraActive2 = false;
      }
    }
  }

  handleEvent1(event: ScannerQRCodeResult[]) {
    if (!this.stopScanning1) {
      this.stopScanning1 = true;
      this.processQRCode(event, 1);
    }
  }

  handleEvent2(event: ScannerQRCodeResult[]) {
    if (!this.stopScanning2) {
      this.stopScanning2 = true;
      this.processQRCode(event, 2);
    }
  }

  private processQRCode(event: ScannerQRCodeResult[], scannerId: number) {
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
          this.labsService.setKioskGroupId(lab[0].kiosk_group_id.toString());
          this._router.navigate([`/main-app/${lab[0].configuration}`], { replaceUrl: true });
        },
        error: async (err) => {
          const info = err.error?.info ? err.error.info : '';
          const translatedErrorMessage = info
            ? this.translate.instant(`POPUP.ERROR_MESSAGES.${info}`)
            : this.translate.instant('POPUP.ERROR_MESSAGES.DEFAULT');
          const errorImageSrc = errorImageSelect(info);
          await this.popupService.openPopup(translatedErrorMessage, errorImageSrc);
          if (scannerId === 1) {
            this.stopScanning1 = false;
          } else if (scannerId === 2) {
            this.stopScanning2 = false;
          }
        },
      });
  }

  ngOnDestroy() {
    console.log('Closing cameras ...');
    if (this.cameraActive1) {
      this.scanner1.stop().subscribe({
        next: (res) => {
          this.cameraActive1 = false;
          this.stopScanning1 = true;
        }
      });
    }
    if (this.cameraActive2) {
      this.scanner2.stop().subscribe({
        next: (res) => {
          this.cameraActive2 = false;
          this.stopScanning2 = true;
        }
      });
    }
  }

  navigateToLabs() {
    console.log('Navigating to labs page ...');
    this._router.navigate(['/labs'], { replaceUrl: true });
  }
}
