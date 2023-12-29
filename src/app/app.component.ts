import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  constructor(private platform: Platform, private router: Router) { }

  ngOnInit(): void {
    if (!this.platform.is('mobile')) {
      this.router.navigate(['/access-denied']);
      console.log("Cannot open app in this device...");
      
    }
  }
}
