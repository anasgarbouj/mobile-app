import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-loader-spinner',
  templateUrl: './loader-spinner.component.html',
  styleUrls: ['./loader-spinner.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderSpinnerComponent {

}
