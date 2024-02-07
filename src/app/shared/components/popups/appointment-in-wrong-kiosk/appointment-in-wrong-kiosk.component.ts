import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-appointment-in-wrong-kiosk',
  templateUrl: './appointment-in-wrong-kiosk.component.html',
  styleUrls: ['./appointment-in-wrong-kiosk.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class AppointmentInWrongKioskComponent  implements OnInit {

  constructor(private activeModel: NgbActiveModal) { }

  ngOnInit() {}
  public dismiss() {
    this.activeModel.dismiss()
  }

}
