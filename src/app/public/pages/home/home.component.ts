import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import {LabsService} from '../../../shared/services/labs.service'
import { take,map } from 'rxjs';
import { ILocation } from 'src/app/shared/interfaces/location';
import { PopupService } from 'src/app/shared/services/popup.service';
import { GeolocationService } from 'src/app/shared/services/geolocation.service';
import { PopupValidDataTypes } from 'src/app/shared/types/PopupValidDataTypes';
import { ILab } from 'src/app/shared/interfaces/Lab';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  constructor(
     private _router: Router ,
     private popUpService: PopupService,
     private readonly geolocationService :GeolocationService,
     private readonly labsService : LabsService
     ) { }

  ngOnInit() {
    console.log("Checking GPS permission...");

    this.geolocationService.getCurrentPosition().then((position) => {
      console.log(position);
      if (!position) this.geolocationService.checkAndRequestPermission();
      this.labsService.fetchLabs(position as ILocation,'')
      .pipe(take(1),map(res=>{
        return { info: res.info, data: res.data }
      }))
      .subscribe((response)=>{
        console.log("Response Info : ",response.info);
        console.log("Response Data : ",response.data);
        console.log("Response Data As Array : ",response.data as ILab[]);
        this.checkResponse(response.info , response.data as ILab[]);
      })
    })

  }


  reload() {
    console.log("Reloading...");
    window.location.reload();
  }



  checkResponse(info:string, labsList : ILab[]){
    switch(info){
      case "LIST_NEAREST_KIOSK_GROUPS_INVALID_ENTRY":
        this.popUpService.openPopup(PopupValidDataTypes.Scanned_Qr_Not_Found);
        break
      case "UNKNOWN_KIOSK_GROUP":
        this.popUpService.openPopup(PopupValidDataTypes.Invalid_Lab);
        break
      case "LIST_NEAREST_KIOSK_GROUPS_SUCCESS" :
        console.log("lab list test",labsList);
        this._router.navigate(["/identify-lab"], { state : { labs : labsList}});
        console.log("navigating to : identify-lab");
        break

    }
  }
}
