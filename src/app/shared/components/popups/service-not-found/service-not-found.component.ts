import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-service-not-found',
  templateUrl: './service-not-found.component.html',
  styleUrls: ['./service-not-found.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceNotFoundComponent  implements OnInit {

  constructor(private activeModel: NgbActiveModal) { }

  ngOnInit() {}
  public dismiss() {
    this.activeModel.dismiss()
  }

}
