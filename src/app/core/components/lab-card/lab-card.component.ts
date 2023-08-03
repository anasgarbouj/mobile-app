import { ChangeDetectionStrategy, Component, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lab-card',
  templateUrl: './lab-card.component.html',
  styleUrls: ['./lab-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabCardComponent {

  @Input() img: string = ""
  @Input() name: string = ""
  @Input() address: string = ""

  @HostListener("click") onClick() {
    this.navigateToIdentification()
  }

  constructor(private _router: Router) { }

  navigateToIdentification() {
    console.log("clicked on " + this.name);
    this._router.navigate(["/appointment"])
  }

}
