import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit {

  private configId: number | null = null;

  constructor(
    private _router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.configId = params.get('configId') ? Number(params.get('configId')) : null;
    });
  }

  navigateToServiceList() {
    console.log("no rdv clicked");
    if (this.configId) {
      this._router.navigate([`/service-list/${this.configId}`])
    } else {
      // TODO: ADD ERROR POPUP
      console.log("configId value ERROR: ", this.configId);
    }
  }

  navigateToIdentification() {
    console.log("identification clicked");
    this._router.navigate([`/identify-appointment`])
  }
}
