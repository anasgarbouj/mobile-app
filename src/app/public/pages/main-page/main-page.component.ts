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
  private kioskGroupId: number | null = null;

  constructor(
    private _router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.kioskGroupId = params.get('kioskGroupId') ? Number(params.get('kioskGroupId')) : null;
      this.configId = params.get('configId') ? Number(params.get('configId')) : null;
    });
  }


  navigateToServiceList() {
    console.log("no rdv clicked");
    if (this.kioskGroupId && this.configId) {
      this._router.navigate([`/service-list/${this.kioskGroupId}/${this.configId}`])
    } else {
      console.log("kioskGroupId or configId value ERROR: ", this.kioskGroupId, this.configId);
    }
  }

  navigateToIdentification() {
    console.log("identification clicked");
    if (this.kioskGroupId) {
      this._router.navigate([`/identify/${this.kioskGroupId}`])
    } else {
      console.log("kioskGroupId value ERROR: ", this.kioskGroupId);
    }
  }
}
