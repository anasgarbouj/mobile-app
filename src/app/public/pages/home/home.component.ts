import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation, Position } from '@capacitor/geolocation';
import {LabsService} from '../../../shared/services/labs.service'
import { take,map } from 'rxjs';
import { ILocation } from 'src/app/shared/interfaces/location';
import { PopupService } from 'src/app/shared/services/popup.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  constructor(private _router: Router , private popUpService: PopupService) { }

  private readonly labsService = inject(LabsService)
  ngOnInit() {
    console.log("Checking GPS permission...");

    this.getCurrentPosition().then((position) => {
      console.log(position);
      if (!position) this.checkAndRequestPermission();
      this.labsService.fetchLabs(position as ILocation,'')
      .pipe(take(1),map(res=>{
        return { info: res.info, data: res.data }
      }))
      .subscribe((response)=>{
        console.log("Response Info : ",response.info);
        console.log("Response Data : ",response.data);
      })
    })

  }

  async checkAndRequestPermission() {
    const hasPermission = await Geolocation.checkPermissions();

    if (hasPermission.location === 'granted') {
      console.log('GPS permission already granted');
      this.getCurrentPosition()

    } else if (hasPermission.location === 'prompt') {
      console.log('GPS permission prompt required');
    } else {
      console.log('GPS permission denied');
      // Request permission
      const permissionRequestResult = await Geolocation.requestPermissions();

      if (permissionRequestResult.location === 'granted') {
        console.log('GPS permission granted after request');
        this.getCurrentPosition()

      } else {
        console.log('GPS permission still denied after request');
      }
    }
  }

  async getCurrentPosition() {
    const options: PositionOptions = {
      enableHighAccuracy: true,
    };
    try {
      const result: Position = await Geolocation.getCurrentPosition(options);
      console.log('GPS permission granted', result);
      console.log(result.coords.latitude, result.coords.longitude);
      this._router.navigate(["/identify-lab"])
      return {
        "lat": result.coords.latitude,
        "long": result.coords.longitude
      }

    } catch (error) {
      console.error('Error requesting GPS permission', error);
      return null
    }
  }

  reload() {
    console.log("Reloading...");
    window.location.reload();
  }

}
