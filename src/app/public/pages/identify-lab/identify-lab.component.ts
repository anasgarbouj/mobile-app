import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxScannerQrcodeComponent, ScannerQRCodeResult, ScannerQRCodeSelectedFiles } from 'ngx-scanner-qrcode';

@Component({
  selector: 'app-identify-lab',
  templateUrl: './identify-lab.component.html',
  styleUrls: ['./identify-lab.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdentifyLabComponent {

  public qrCodeResult: ScannerQRCodeSelectedFiles[] = [];
  public qrCodeResult2: ScannerQRCodeSelectedFiles[] = [];

  constructor(private _router: Router) {

  }
  navigateToLabs() {
    this._router.navigate(["/labs"])
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



} 