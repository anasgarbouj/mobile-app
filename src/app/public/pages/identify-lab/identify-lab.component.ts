import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {  ScannerQRCodeResult } from 'ngx-scanner-qrcode';
import { map, take } from 'rxjs';
import { ILocation } from 'src/app/shared/interfaces/location';
import { GeolocationService } from 'src/app/shared/services/geolocation.service';
import { LabsService } from 'src/app/shared/services/labs.service';

@Component({
  selector: 'app-identify-lab',
  templateUrl: './identify-lab.component.html',
  styleUrls: ['./identify-lab.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdentifyLabComponent  {

  // private debounceTimer: any;
  // private debounceTime = 300; // milliseconds

  private readonly labsService = inject (LabsService)
  private readonly geolocationService = inject (GeolocationService)

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


  // handleEvent(event : ScannerQRCodeResult[]){
  //   clearTimeout(this.debounceTimer);
  //   this.debounceTimer = setTimeout(() => {
  //    console.log(event[0].value);
  //   }, this.debounceTime);

  // }

  private stopScanning : boolean = false ;

  handleEvent(event : ScannerQRCodeResult[]){
    if(!this.stopScanning) {
      console.log((event[0].value));
      this.stopScanning = ! this.stopScanning ;

      this.geolocationService.getCurrentPosition("/labs").then((position) => {
        console.log(position);
        if (!position) this.geolocationService.checkAndRequestPermission();
        this.labsService.fetchLabs(position as ILocation,event[0].value)
        .pipe(take(1),map(res=>{
          return { info: res.info, data: res.data }
        }))
        .subscribe((response)=>{
          console.log("Response Info : ",response.info);
          console.log("Response Data : ",response.data);
        })
      })

    }



  }



}
