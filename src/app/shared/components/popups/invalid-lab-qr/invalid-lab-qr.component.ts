import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-invalid-lab-qr',
  templateUrl: './invalid-lab-qr.component.html',
  styleUrls: ['./invalid-lab-qr.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class InvalidLabQrComponent  implements OnInit {

  constructor(private activeModel: NgbActiveModal) { }

  ngOnInit() {}
  public dismiss() {
    this.activeModel.dismiss()
  }

}
