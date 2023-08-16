import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DividerComponent {

  @Input() text = "Ou"
}
