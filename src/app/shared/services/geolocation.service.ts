import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation, Position } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor(private _router: Router) { }

  public  async checkAndRequestPermission() {
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




  public async getCurrentPosition() {
    const options: PositionOptions = {
      enableHighAccuracy: true,
    };
    try {
      const result: Position = await Geolocation.getCurrentPosition(options);
      console.log('GPS permission granted', result);
      console.log(result.coords.latitude, result.coords.longitude);
      // if(navigateTo !== ""){
      //   this._router.navigate([navigateTo]);
      //   console.log("navigating to :" , navigateTo);

      // }
      return {
        "lat": result.coords.latitude,
        "long": result.coords.longitude
      }

    } catch (error) {
      console.error('Error requesting GPS permission', error);
      return null
    }
  }
}
