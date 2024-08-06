import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeolocationService } from 'src/app/shared/services/geolocation.service';

@Component({
  selector: 'app-home',
  templateUrl: './check-gps-permission.component.html',
  styleUrls: ['./check-gps-permission.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckGpsPermissionComponent implements OnInit {
  constructor(
    private _router: Router,
    private readonly geolocationService: GeolocationService
  ) {}

  ngOnInit() {
    console.log("CheckGpsPermissionComponent init");
    
    this.checkGpsPermission();
  }

  async checkGpsPermission() {
    // console.log('Checking GPS permission...');
    this.geolocationService.getCurrentPosition().then((position) => {
      // console.log("position : ",position);
      if (position) {
        // console.log('User currently at position :', position);
        // console.log("navigate to /labs");
        this._router.navigate(['/labs']);
        // console.log("complete to /labs");

      }
    });
    // console.log('Checking GPS  completed...');
  }

  reload() {
    // console.log('Reloading...');
    window.location.reload();
  }
}
