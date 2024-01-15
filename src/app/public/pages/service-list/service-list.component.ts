import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceListComponent {


  constructor(private _router: Router) { }

  items = Array();
  ngOnInit() {
    this.generateItems();
  }
  private generateItems() {
    const count = this.items.length + 1;
    for (let i = 0; i < 50; i++) {
      this.items.push({
        "name": `Service ${count + i}`,
        "color": this.genHexString(),
      });
    }
  }
  genHexString() {
    let output = '#';
    for (let i = 0; i < 6; ++i) {
      output += (Math.floor(Math.random() * 16)).toString(16);
    }
    return output;
  }
  navigateToEmail(item: any) {
    console.log("clicked on " + item.name);
    this._router.navigate(["/email-confirmation"])
  }
}
