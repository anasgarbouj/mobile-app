import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-identify-lab',
  templateUrl: './identify-lab.component.html',
  styleUrls: ['./identify-lab.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdentifyLabComponent {
  constructor(private _router: Router) {

  }
  navigateToLabs() {
    this._router.navigate(["/labs"])
  }

  
  async startQrScan(){
    console.log("qr code clicked...");
    const cameraPermissionState = await this.checkAndRequestCameraPermission()
    
    if(!cameraPermissionState){
      console.log("Exit Qr Scan ..No camera permission was granted...");
      return;
    }
    console.log("Starting Qr Code Scan...");

  }

   async checkAndRequestCameraPermission() : Promise<boolean>{
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log('Camera permission already granted:', stream);
      return true;
  
    } catch (error) {
      console.warn('Camera permission not granted. Requesting permission...');
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        console.log('Camera permission granted after requesting.');
        return true;

      } catch (error) {
        console.error('Failed to get camera permission:', error);
        return false;
      }
    }
  }
}
