import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import {LabsService} from '../../../shared/services/labs.service'
import { take,map } from 'rxjs';
import { ILocation } from 'src/app/shared/interfaces/location';
import { PopupService } from 'src/app/shared/services/popup.service';
import { GeolocationService } from 'src/app/shared/services/geolocation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  constructor(private _router: Router , private popUpService: PopupService) { }

  private readonly labsService = inject(LabsService)
  private readonly geolocationService = inject (GeolocationService)

  ngOnInit() {
    console.log("Checking GPS permission...");

    this.geolocationService.getCurrentPosition("/identify-lab").then((position) => {
      console.log(position);
      if (!position) this.geolocationService.checkAndRequestPermission();
      this.labsService.fetchLabs(position as ILocation,'')
      .pipe(take(1),map(res=>{
        return { info: res.info, data: res.data }
      }))
      .subscribe((response)=>{
        console.log("Response Info : ",response.info);
        console.log("Response Data : ",response.data);
      })
    })

  }


  reload() {
    console.log("Reloading...");
    window.location.reload();
  }

}
