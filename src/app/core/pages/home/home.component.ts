import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation, Position } from '@capacitor/geolocation';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
    console.log("Checking GPS permission...");

    this.getCurrentPosition().then(elem => {
      console.log(elem);
      if (elem == null) {
        this.checkAndRequestPermission();
      }
    })
  }

  async checkAndRequestPermission() {
    const hasPermission = await Geolocation.checkPermissions();

    if (hasPermission.location === 'granted') {
      console.log('GPS permission already granted');
      this.getCurrentPosition()

    } else if (hasPermission.location === 'prompt') {
      console.log('GPS permission prompt required');
    } else {
      console.log('GPS permission denied');
      // Request permission
      const permissionRequestResult = await Geolocation.requestPermissions();

      if (permissionRequestResult.location === 'granted') {
        console.log('GPS permission granted after request');
        this.getCurrentPosition()

      } else {
        console.log('GPS permission still denied after request');
      }
    }
  }

  async getCurrentPosition() {
    const options: PositionOptions = {
      enableHighAccuracy: true,
    };
    try {
      const result: Position = await Geolocation.getCurrentPosition(options);
      console.log('GPS permission granted', result);
      console.log(result.coords.latitude, result.coords.longitude);
      this._router.navigate(["/appointment"])
      return {
        "lat": result.coords.latitude,
        "lng": result.coords.longitude
      }

    } catch (error) {
      console.error('Error requesting GPS permission', error);
      return null
    }
  }

  reload() {
    console.log("Reloading...");
    window.location.reload();
  }
}
