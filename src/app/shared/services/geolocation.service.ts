import { Injectable } from '@angular/core';
import { ILocation } from '../interfaces/location';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  constructor() { }

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
  public getCurrentPositionStatic(): Promise<{ lat: number; long: number } | null> {
    return new Promise((resolve) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              long: position.coords.longitude,
            });
          },
          (error) => {
            console.error("Error requesting User Location:", error);
            resolve(null); // Return null in case of error
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser');
        resolve(null); // Return null if geolocation is not supported
      }
    });
  }
  
  
}
