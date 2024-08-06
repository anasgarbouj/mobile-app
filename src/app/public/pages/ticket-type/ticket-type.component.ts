import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ticket-type-page',
  templateUrl: './ticket-type.component.html',
  styleUrls: ['./ticket-type.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketTypeComponent implements OnInit {

  private configId: number | null = null;

  constructor(
    private _router: Router,
  ) { }

  ngOnInit(): void {
  }

  navigateToServiceList() {
      this._router.navigate([`/service-list`])
  }

  navigateToIdentification() {
    // console.log("identification clicked");
    this._router.navigate([`/identify-appointment`])
  }
}
