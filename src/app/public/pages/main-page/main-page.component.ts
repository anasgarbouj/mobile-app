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

  constructor(private _router: Router) { }

  ngOnInit(): void {
    const config = this._router.getCurrentNavigation()?.extras.state?.['config'];
    console.log("configId recieved from lab :",config);
    this.configID = config ;
  }


  navigateToServiceList() {
    console.log("no rdv clicked");
    this._router.navigate(["/service-list"], {state:{config : this.configID}})

  }

  navigateToIdentification() {
    console.log("identification clicked");
    this._router.navigate(["/identify"])

  }
}
