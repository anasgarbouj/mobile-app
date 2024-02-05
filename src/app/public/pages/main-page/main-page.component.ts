import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit {

  private configID : number =0;
  private kioskId : number =0;

  constructor(private _router: Router) { }

  ngOnInit(): void {
    const config = this._router.getCurrentNavigation()?.extras.state?.['config'];
    const kioskId = this._router.getCurrentNavigation()?.extras.state?.['kioskID'];
    console.log("configId recieved from lab :",config);
    console.log("Kiosk Group Id recieved from lab :", kioskId);

    this.configID = config ;
    this.kioskId= kioskId;
  }


  navigateToServiceList() {
    console.log("no rdv clicked");
    this._router.navigate(["/service-list"], {state:{config : this.configID , kioskId : this.kioskId }})

  }

  navigateToIdentification() {
    console.log("identification clicked");
    this._router.navigate(["/identify"] , {state: {kioskId : this.kioskId}})

  }
}
