import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-expired-popup',
  templateUrl: './expired-popup.component.html',
  styleUrls: ['./expired-popup.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpiredPopupComponent {
  @Input() message: string = "";
  @Input() imageSrc: string = "";

  constructor(
    private activeModel: NgbActiveModal,
    private router: Router
  ) { }

  returnToHome() {
    this.activeModel.close(false)
    this.router.navigate(['/identify-lab']);
  }
}
