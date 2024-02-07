import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoreComponent {


    constructor(private platform: Platform, private router: Router) {
      console.log("Checking browser compatibility..");


     }

    ngOnInit(): void {

      if (!this.platform.is('mobile')) {
      this.router.navigate(['/access-denied']);
      console.log("Cannot open app in this device...");
      }



    }

    }
