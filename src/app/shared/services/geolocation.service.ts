import { Injectable } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';
import { ILocation } from '../interfaces/location';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }

  public async checkAndRequestPermission() {
    const hasPermission = await Geolocation.checkPermissions();
    if (hasPermission.location === 'granted') {
      console.log('GPS permission already granted');
      return this.getCurrentPosition()
    } else {
      console.log('GPS permission denied');      
      // Request permission
      const permissionRequestResult = await Geolocation.requestPermissions();
      console.log(permissionRequestResult);
      if (permissionRequestResult.location === 'granted') {
        console.log('GPS permission granted after request');
        return this.getCurrentPosition()
      } else {
        console.log('GPS permission still denied after request');
        return null
      }
    }
  }

  public async checkPermission() {
    const hasPermission = await Geolocation.checkPermissions();
    console.log(hasPermission);
    if (hasPermission.location === 'granted') {
      console.log('GPS permission already granted');
      return true
    } 
    else {
      console.log('GPS permission denied');
      // Request permission
      const permissionRequestResult = await Geolocation.requestPermissions();
      console.log(permissionRequestResult);
      if (permissionRequestResult.location === 'granted') {
        console.log('GPS permission granted after request');
        return true
      } else {
        return false
      }
    }
  }

  public async getCurrentPosition() : Promise<ILocation | null> {
    const options: PositionOptions = {
      enableHighAccuracy: true,
    };
    try {
      const result: Position = await Geolocation.getCurrentPosition(options);
      console.log('GPS permission granted', result);
      console.log(result.coords.latitude, result.coords.longitude);
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
