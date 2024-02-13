import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { ILab } from 'src/app/shared/interfaces/Lab';
import { LabsService } from 'src/app/shared/services/labs.service';
import { PopupService } from 'src/app/shared/services/popup.service';

@Component({
  selector: 'app-labs',
  templateUrl: './labs.component.html',
  styleUrls: ['./labs.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabsComponent implements OnInit {

  constructor(
    private _router: Router,
    private popupService: PopupService,
    private readonly labsService: LabsService,
    private cdr: ChangeDetectorRef
  ) { }

  labs: ILab[] = [];

  ngOnInit() {
    this.getLabs();
  }

  getLabs() {
    // TODO: ADD SEARCH
    this.labsService.fetchLabs()
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          console.log("fetchLabs Response Info : ", response.info);
          console.log("fetchLabs Response Data : ", response.data);
          this.labs = response.data as ILab[];
          console.log(this.labs);
          this.cdr.detectChanges();
        }
      });
  }

  navigateToIdentification(item: ILab) {
    console.log("clicked on: " + item);
    this._router.navigate([`/main-app/${item.kiosk_group_id}/${item.configuration}`]);
  }
}
