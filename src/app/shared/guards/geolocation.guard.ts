import { Router, CanActivateFn } from '@angular/router';
import { GeolocationService } from '../services/geolocation.service';

export const geolocationGuard: CanActivateFn = async (route, state) => {
  const router = new Router();
  const geolocationService = new GeolocationService();
  console.log('Current navigation state:', state.url);
  try {
    const userPosition = await geolocationService.getCurrentPosition;
    if (userPosition) {
      console.log('Geolocation Guard Success');
      console.log('Geolocation =>', userPosition);
      return true;
    } else {
      console.log('Geolocation Guard Failed');
      router.navigate(['/home']);
      console.log('redirecting to home');
      return false;
    }
  } catch (error) {
    console.error(
      'redirecting to home, Error checking geolocation permission:',
      error
    );
    router.navigate(['/home']);
    return false;
  }
};
