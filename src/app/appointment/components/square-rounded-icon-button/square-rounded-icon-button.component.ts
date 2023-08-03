import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-square-rounded-icon-button',
  templateUrl: './square-rounded-icon-button.component.html',
  styleUrls: ['./square-rounded-icon-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SquareRoundedIconButtonComponent {

  @Input() icon: string = ""
  @Input() label: string = ""
  @Input() color: "primary" | "secondary" | undefined;

}
