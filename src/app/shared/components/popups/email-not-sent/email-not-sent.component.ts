import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-email-not-sent',
  templateUrl: './email-not-sent.component.html',
  styleUrls: ['./email-not-sent.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class EmailNotSentComponent  implements OnInit {

  constructor(private activeModel: NgbActiveModal) { }

  ngOnInit() {}

  public dismiss() {
    this.activeModel.dismiss()
  }

}
