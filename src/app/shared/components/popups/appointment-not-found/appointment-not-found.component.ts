import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-appointment-not-found',
  templateUrl: './appointment-not-found.component.html',
  styleUrls: ['./appointment-not-found.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class AppointmentNotFoundComponent  implements OnInit {

  constructor(private activeModel: NgbActiveModal) { }

  ngOnInit() {}
  public dismiss() {
    this.activeModel.dismiss()
  }


}
