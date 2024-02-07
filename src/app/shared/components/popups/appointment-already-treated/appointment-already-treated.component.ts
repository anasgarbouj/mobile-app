import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-appointment-already-treated',
  templateUrl: './appointment-already-treated.component.html',
  styleUrls: ['./appointment-already-treated.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class AppointmentAlreadyTreatedComponent  implements OnInit {

  constructor(private activeModel: NgbActiveModal) { }

  ngOnInit() {}
  public dismiss() {
    this.activeModel.dismiss()
  }
}
