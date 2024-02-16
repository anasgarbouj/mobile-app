import { Injectable } from '@angular/core';
// import { Geolocation, Position } from '@capacitor/geolocation';
import { ILocation } from '../interfaces/location';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  constructor() { }

  // public async checkAndRequestPermission() {
  //   try {
  //     const hasPermission = await Geolocation.checkPermissions();
  //     if (hasPermission.location === 'granted') {
  //       console.log('GPS permission already granted');
  //       return this.getCurrentPosition();
  //     } else {
  //       console.log('GPS permission denied');
  //       // Request permission
  //       const permissionRequestResult = await Geolocation.requestPermissions();
  //       console.log(permissionRequestResult);
  //       if (permissionRequestResult.location === 'granted') {
  //         console.log('GPS permission granted after request');
  //         return this.getCurrentPosition();
  //       } else {
  //         console.log('GPS permission still denied after request');
  //         return null;
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     return null;
  //   }
  // }

  // public async checkPermission() {
  //   try {
  //     const hasPermission = await Geolocation.checkPermissions();
  //     if (hasPermission.location === 'granted') {
  //       console.log('GPS permission already granted');
  //       return true;
  //     } else {
  //       console.log('GPS permission denied');
  //       return false;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // }
  // public async checkPermission() {
  //   if ('permissions' in navigator) {
  //     try {
  //       const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });
  //       console.log(permissionStatus);
  //       if (permissionStatus.state === 'granted') {
  //         console.log('GPS permission already granted');
  //         return true;
  //       } else {
  //         console.log('GPS permission denied');
  //         return false;
  //       }
  //     } catch (error) {
  //       console.error('Error checking GPS permission:', error);
  //       return false;
  //     }
  //   } else {
  //     console.error('Geolocation is not supported in this browser');
  //     return false;
  //   }
  // }

  // public async getCurrentPosition(): Promise<ILocation | null> {
  //   const options: PositionOptions = {
  //     enableHighAccuracy: true,
  //   };
  //   try {
  //     const result: Position = await Geolocation.getCurrentPosition(options);
  //     console.log('GPS permission granted', result);
  //     console.log(result.coords.latitude, result.coords.longitude);
  //     return {
  //       lat: result.coords.latitude,
  //       long: result.coords.longitude,
  //     };
  //   } catch (error) {
  //     console.error('Error requesting GPS permission', error);
  //     return null;
  //   }
  // }
  public async getCurrentPosition(): Promise<ILocation | null> {
    if (navigator.geolocation) {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        return {
          lat: position.coords.latitude,
          long: position.coords.longitude,
        };
      } catch (error) {
        console.error("Error requesting User Location:", error);
        return null;
      }
    } else {
      console.error('Geolocation is not supported by this browser');
      return null;
    }
  }
}
