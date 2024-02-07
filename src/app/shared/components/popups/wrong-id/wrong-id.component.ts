import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-wrong-id',
  templateUrl: './wrong-id.component.html',
  styleUrls: ['./wrong-id.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class WrongIdComponent  implements OnInit {

  constructor(private activeModel: NgbActiveModal) { }

  ngOnInit() {}
  public dismiss() {
    this.activeModel.dismiss()
  }
}
