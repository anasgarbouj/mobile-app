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
    this.geolocationService.getCurrentPosition().then((position)=>{

      if(position){
        console.log("User currently at position :", position);
        this._router.navigate(["/identify-lab"]);
      }
      else{
        this.geolocationService.checkAndRequestPermission();
      }

    }

    )
  }

  reload() {
    console.log("Reloading...");
    window.location.reload();
  }
}
