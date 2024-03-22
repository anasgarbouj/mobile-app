import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PlatformCompatibilityGuard implements CanActivate {

  constructor(
    private platform: Platform,
    private router: Router
  ) { }

  canActivate(): boolean {
    // Check if the platform is compatible
    if (!this.platform.is('mobileweb')) {
      // If the platform is not compatible, navigate to a different route
      this.router.navigate(['/access-denied']);
      return false;
    }
    return true;
  }
}
