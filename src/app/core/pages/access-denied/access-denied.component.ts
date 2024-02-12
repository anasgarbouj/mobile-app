import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccessDeniedComponent implements OnInit {

  constructor(
    private platform: Platform, 
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (this.platform.is('mobileweb')) {
      console.log("Application oppened in mobile browser ..");
      console.log("redirecting to home page ..");
      this.router.navigate(['/home']);
    }
  }

}






