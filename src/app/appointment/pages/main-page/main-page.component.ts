import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent {

  constructor(private _router: Router) { }


  navigateToServiceList() {
    console.log("rdv clicked");
    this._router.navigate(["/service-list"])

  }

  navigateToIdentification() {
    console.log("identification clicked");
    this._router.navigate(["/identify"])

  }
}
