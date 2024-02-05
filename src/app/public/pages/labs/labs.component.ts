import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { param } from 'jquery';
import { ILab } from 'src/app/shared/interfaces/Lab';
import { PopupService } from 'src/app/shared/services/popup.service';
import { PopupValidDataTypes } from 'src/app/shared/types/PopupValidDataTypes';

@Component({
  selector: 'app-labs',
  templateUrl: './labs.component.html',
  styleUrls: ['./labs.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabsComponent implements OnInit {

  private kioskGroupId : number= 0;

  constructor(private _router: Router ,private route: ActivatedRoute , private popupService :PopupService) { }

  items : ILab[] = [] ;

  ngOnInit() {

   const kioskID = this._router.getCurrentNavigation()?.extras.state?.['kioskID'];
   this.kioskGroupId= kioskID;
   const labs = this._router.getCurrentNavigation()?.extras.state?.['labs'];
   if (labs && labs.length > 0) {
    console.log("List Of Labs Received:", labs);
    this.items = labs;
  } else {
    console.log("No Available labs in this area!");
    this.popupService.openPopup(PopupValidDataTypes.NoNearbyLabs);
  }

  }

  navigateToIdentification(item: ILab) {
    console.log("clicked on " + item.kiosk_group_id);
    this._router.navigate(["/main-app"] ,{state:{config : item.configuration , kioskID : item.kiosk_group_id}})
  }

}
