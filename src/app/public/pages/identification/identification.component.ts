import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScannerQRCodeResult } from 'ngx-scanner-qrcode';

@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdentificationComponent {

  private debounceTimer: any;
  private debounceTime = 300;

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
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
     console.log(event[0].value);
    }, this.debounceTime);

  }

}
