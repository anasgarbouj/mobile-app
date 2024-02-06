import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-kiosk-group-not-found',
  templateUrl: './kiosk-group-not-found.component.html',
  styleUrls: ['./kiosk-group-not-found.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KioskGroupNotFoundComponent  implements OnInit {

  constructor(private activeModel: NgbActiveModal) { }

  ngOnInit() {}
  public dismiss() {
    this.activeModel.dismiss()
  }

}
