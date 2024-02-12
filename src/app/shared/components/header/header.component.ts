import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  constructor(private _router:Router){}

  navigateToHomePage(){
    console.log("Logo Clicked , Navigating to home page... ");
    this._router.navigate(["/identify-lab"]);
  }

}
