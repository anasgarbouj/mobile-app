import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeolocationService } from 'src/app/shared/services/geolocation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  constructor(
    private _router: Router,
    private readonly geolocationService: GeolocationService,
  ) { }

  ngOnInit() {
    this.checkGpsPermission()
  }

  async checkGpsPermission(){
    console.log("Checking GPS permission...");
    await this.geolocationService.checkPermission().then((hasAcess) => {
      if (hasAcess) {
        this._router.navigate(["/identify-lab"]);
      } else {
        console.log('GPS permission still denied after request');
        // TODO: app popup?? 'you need to give location acces'
      }
    })
  }

  reload() {
    console.log("Reloading...");
    window.location.reload();
  }
}
