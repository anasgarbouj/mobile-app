import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccessDeniedComponent {
  swRegistration :any;

  constructor(){
    if (!('serviceWorker' in navigator)) {
      // Service Worker isn't supported on this browser, disable or hide UI.
      console.log("Service Worker isn't supported on this browser, disable or hide UI")
    }
    else console.log("Service Worker is supported on this browser, disable or hide UI")
  
    if (!('PushManager' in window)) {
      // Push isn't supported on this browser, disable or hide UI.
      console.log("Push Manager isn't supported on this browser, disable or hide UI")
    }
    else console.log("Push Manager is supported on this browser, disable or hide UI")
    this.swRegistration = this.registerServiceWorker()
    // to ask for the Notification Permission
    this.askPermission()
    // to check the Notification Permission State
    console.log(this.getNotificationPermissionState())
    setTimeout(() => 
    {
      localStorage.setItem('applicationServerPublicKey',"BICK9_Yr5fsWh85mQimWSncaC8jnS6Z9EpMMbgf7PZIf7LYiMTDSTt2Y7uLtEmZd9FXo8kHt2Jf6");
      this.subscribeUser()
    },
    5000);
    

  }

  registerServiceWorker() {
    navigator.serviceWorker.register("assets/js/sw.js")
		.then(function(swReg) {
			console.log('Service Worker is registered', swReg);
			return swReg;
		})
		.catch(function(error) {
			console.error('Service Worker Error', error);
		});
    // return navigator.serviceWorker.register('assets/js/sw.js')
    // .then(function(registration) {
    //   console.log('Service worker successfully registered.');
    //   return registration;
    // })
    // .catch(function(err) {
    //   console.error('Unable to register service worker.', err);
    // });
  }

  askPermission() {
    return new Promise(function(resolve, reject) {
      const permissionResult = Notification.requestPermission(function(result) {
        resolve(result);
      });
  
      if (permissionResult) {
        permissionResult.then(resolve, reject);
      }
    })
    .then(function(permissionResult) {
      if (permissionResult !== 'granted') {
        throw new Error('We weren\'t granted permission.');
      }
    });
  }

  getNotificationPermissionState() {
    if (navigator.permissions) {
      return navigator.permissions.query({name: 'notifications'})
      .then((result) => {
        return result.state;
      });
    }
  
    return new Promise((resolve) => {
      resolve(Notification.permission);
    });
  }

  urlB64ToUint8Array(base64String:any) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  subscribeUser() {
    const applicationServerPublicKey = localStorage.getItem('applicationServerPublicKey');
    const applicationServerKey = this.urlB64ToUint8Array(applicationServerPublicKey);
    console.log("this.swRegistration : ",this.swRegistration.pushManager);
    this.swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
      })
      .then(function(subscription:any) {
        console.log('User is subscribed.');

      })
      .catch(function(err:any) {
        console.log('Failed to subscribe the user: ', err);
      });
  }

  
  
}
