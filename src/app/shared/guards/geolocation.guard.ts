import { Router, type CanActivateFn } from '@angular/router';
import { GeolocationService } from '../services/geolocation.service';

export const geolocationGuard: CanActivateFn = async (route, state) => {
  const router = new Router();
  const geolocationService = new GeolocationService();
  console.log('Current navigation state:', state.url);
  try {
    const hasPermission = await geolocationService.checkPermission();
    if (hasPermission) {
      console.log('Geolocation Guard Success');
      console.log('Geolocation =>', hasPermission);
      return true;
    } else {
      console.log('Geolocation Guard Failed');
      router.navigate(['/home']);
      console.log('redirecting to access denied');
      return false;
    }
  } catch (error) {
    console.error('Error checking geolocation permission:', error);
    router.navigate(['/home']);
    return false;
  }
};
