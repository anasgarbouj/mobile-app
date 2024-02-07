import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-scanned-lab-not-found',
  templateUrl: './scanned-lab-not-found.component.html',
  styleUrls: ['./scanned-lab-not-found.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ScannedLabNotFoundComponent  implements OnInit {

  constructor(private activeModel: NgbActiveModal) { }

  ngOnInit() {}
  public dismiss() {
    this.activeModel.dismiss()
  }
}
