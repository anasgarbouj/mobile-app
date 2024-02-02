import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-no-nearby-labs',
  templateUrl: './no-nearby-labs.component.html',
  styleUrls: ['./no-nearby-labs.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoNearbyLabsComponent {

  constructor(private activeModel: NgbActiveModal) { }




}
