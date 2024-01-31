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

  swRegistration :any;
  private serverUrl = "http://127.0.0.1:8080";


    constructor(private platform: Platform, private router: Router) {
      console.log("Checking browser compatibility..");
      this.checkBrowserCompatibility();
      console.log(this.getNotificationPermissionState())

     }

    ngOnInit(): void {

      if (!this.platform.is('mobile')) {
      this.router.navigate(['/access-denied']);
      console.log("Cannot open app in this device...");
      }

    
      setTimeout(() => 
      {
        // localStorage.setItem('applicationServerPublicKey',"BPBl6W7FeNssEY0tMST5GuhWreQb7lCS6tdnPaYWWz5LbQ_sggmLenTlXdZQlaQUHCaDdCMDf6QDVp_KJe7uN4M");
        this.fetchPublicKeyAndStore();
        console.log("applicationServerKey  after saving: ",localStorage.getItem('applicationServerPublicKey'));
        this.subscribeUser();
        console.log("application subtoken ",localStorage.getItem('sub_token'));
        this.push_message();
      },
      10000);

      
    
    }

    //**************************************************************************************** */

    checkBrowserCompatibility () {
      if (!('serviceWorker' in navigator)) {
        console.log("Service Worker isn't supported on this browser");
        return;
      }
      else{
        console.log("Service Worker is supported on this browser");
        this.swRegistration = this.registerServiceWorker();
        console.log(this.swRegistration)
        this.requestNotificationPermission()
      }
    
      if (!('PushManager' in window)) {
        console.log("Push isn't supported on this browser");
        return;
      }
      else {
        console.log("Push is supported on this browser");
      }
    }

    
  registerServiceWorker(): Promise<ServiceWorkerRegistration | void> {
      return navigator.serviceWorker.register("/assets/js/service-worker.js")
        .then((registration: ServiceWorkerRegistration) => {
          console.log('Service worker successfully registered.');
          this.swRegistration = registration;
          return registration;
        })
        .catch((err: Error) => {
          console.error('Unable to register service worker.', err);
        });
    }


    requestNotificationPermission(){
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

    fetchPublicKeyAndStore(): void {
      fetch(`${this.serverUrl}/subscription/`, {
          method: 'GET'
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          console.log('response', data);
          console.log("public key is:" , data.public_key);
          localStorage.setItem('applicationServerPublicKey', data.public_key);
      })
      .catch(error => {
          console.error('There was a problem fetching the public key:', error);
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
      if (!applicationServerKey) {
        console.error('Application server public key not found in local storage.');
        return;
    }
      console.log("this.swRegistration 2 : ",this.swRegistration);
      console.log("applicationServerKey : ",applicationServerKey);
      this.swRegistration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: applicationServerKey
        })
        .then(function(subscription:any) {
          console.log('User is subscribed.',JSON.stringify(subscription));
          const serializedSubscription = JSON.stringify(subscription);
          localStorage.setItem('sub_token',serializedSubscription);
        })
        .catch(function(err:any) {
          console.log('Failed to subscribe the user: ', err);
        });
    }  
  
    //get notification from back 
    
    push_message(): void {
      const subToken = localStorage.getItem('sub_token');
      if (subToken === null || subToken === undefined) {
          console.error('Subscription token not found in localStorage.');
          return;
      }
  
      fetch(`${this.serverUrl}/push_v1/`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json; charset=utf-8'
          },
          body: JSON.stringify({ 'sub_token': subToken })
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.text(); 
      })
      .then(data => {
          // Check if response data is not empty
          if (data.trim() !== '') {
              console.log('success', JSON.parse(data)); 
          } else {
              console.log('success', 'Response data is empty');
          }
      })
      .catch(error => {
          console.error('error', error);
      });
  }
  
}
