import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoreComponent {
    constructor(private platform: Platform, private router: Router) { }

    ngOnInit(): void {
      if (this.platform.is('mobile')) {
      this.router.navigate(['/access-denied']);
      console.log("Cannot open app in this device...");
      }

      console.log("Checking browser compatibility..");
      this.checkBrowserCompatibility();

    }

    checkBrowserCompatibility () {
      if (!('serviceWorker' in navigator)) {
        console.log("Service Worker isn't supported on this browser");
        return;
      }
      else{
        console.log("Service Worker is supported on this browser");
        let res = this.registerServiceWorker();
        console.log(res)
      }
    
      if (!('PushManager' in window)) {
        console.log("Push isn't supported on this browser");
        return;
      }
      else {
        console.log("Push is supported on this browser");
      }
    }

    async registerServiceWorker(): Promise<ServiceWorkerRegistration | void> {
      return navigator.serviceWorker.register("/assets/js/service-worker.js")
        .then((registration: ServiceWorkerRegistration) => {
          console.log('Service worker successfully registered.');
          return registration;
        })
        .catch((err: Error) => {
          console.error('Unable to register service worker.', err);
        });
    }
    
}
