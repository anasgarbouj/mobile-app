import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, debounce, take, timer } from 'rxjs';
import { ILab } from 'src/app/shared/interfaces/Lab';
import { LabsService } from 'src/app/shared/services/labs.service';
import { PopupService } from 'src/app/shared/services/popup.service';
import { PopupValidDataTypes } from 'src/app/shared/types/PopupValidDataTypes';

@Component({
  selector: 'app-labs',
  templateUrl: './labs.component.html',
  styleUrls: ['./labs.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabsComponent implements OnInit {

  labs: ILab[] = [];
  searchTerm: string = '';
  searchTermSubject = new Subject<string>();


  constructor(
    private _router: Router,
    private popupService: PopupService,
    private readonly labsService: LabsService,
    private cdr: ChangeDetectorRef
  ) {
    this.searchTermSubject
    .pipe(
      debounce(() => timer(3000))
    )
    .subscribe((searchTerm) => {
      console.log('Search term:', searchTerm);
      this.searchTerm = searchTerm;
      this.getLabs(this.searchTerm)
    });

   }




  ngOnInit() {
    this.getLabs();
  }

  getLabs(search:string="") {
    // TODO: ADD SEARCH
    this.labsService.fetchLabs(search)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          console.log("fetchLabs Response Info : ", response.info);
          console.log("fetchLabs Response Data : ", response.data);
          this.labs = response.data as ILab[];
          console.log(this.labs);
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.labs = [];
          this.cdr.detectChanges();
          this.checkResponse(err.error.info ? err.error.info : "");
        },
      });
  }

  navigateToIdentification(item: ILab) {
    console.log("clicked on: " + item);
    this._router.navigate([`/main-app/${item.kiosk_group_id}/${item.configuration}`]);
  }

  checkResponse(info: string) {
    switch (info) {
      case "LIST_NEAREST_KIOSK_GROUPS_INVALID_ENTRY":
        this.popupService.openPopup(PopupValidDataTypes.Scanned_Qr_Not_Found);
        break
      case "UNKNOWN_KIOSK_GROUP":
        this.popupService.openPopup(PopupValidDataTypes.Invalid_Lab);
        break
    }
  }

  onSearch(searchTerm: string) {
    this.searchTermSubject.next(searchTerm);
  }
}
