import { Router, CanActivateFn } from '@angular/router';
import { GeolocationService } from '../services/geolocation.service';


export const geolocationGuard: CanActivateFn = async (route, state) => {
  const router = new Router();
  const geolocationService = new GeolocationService();
  console.log('Current navigation state:', state.url);
  try {
    const hasPermission = await geolocationService.getCurrentPosition();
    if (hasPermission) {
      console.log('Geolocation Guard Success');
      console.log('Geolocation =>', hasPermission);
      return true;
    } else {
      console.log('Geolocation Guard Failed');
      console.log('redirecting to home');
      return router.navigate(['/home']);
    }
  } catch (error) {
    console.error('redirecting to home, Error checking geolocation permission:', error);
    return router.navigate(['/home']);
  }
};
