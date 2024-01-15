import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceCardComponent {
  @Input() name: string = ""
  @Input() color: string = ""

  amount = 80

  adjust() {
    return '#' + this.color.replace(/^#/, '').replace(/../g,
      color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + this.amount)).toString(16)).slice(- 2));
  }
}
