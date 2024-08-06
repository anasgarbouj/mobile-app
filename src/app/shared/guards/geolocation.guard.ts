import { Router, CanActivateFn } from '@angular/router';
import { GeolocationService } from '../services/geolocation.service';

export const geolocationGuard: CanActivateFn = async (route, state) => {
  const router = new Router();
  const geolocationService = new GeolocationService();
  console.log('Current navigation state:', state.url);
    const userPosition = geolocationService.getCurrentPositionStatic().then((result) => {
      if (result === null) {
        console.log("The promise resolved with null.");
        console.log('Geolocation Guard Failed');
        console.log('redirecting to home');
        return router.navigate(['/check-gps-permission']);
      } else {
        console.log(`The position is: lat=${result.lat}, long=${result.long}`);
        console.log('Geolocation Guard Success');
        console.log('Geolocation =>', userPosition);
      return true;
      }
    }).catch((error) => {
      console.error("The promise was rejected with an error:", error);
      console.log('Geolocation Guard Failed');
      console.log('redirecting to home');
      return router.navigate(['/check-gps-permission']);
    });
    return true
};
