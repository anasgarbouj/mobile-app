import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, debounce, take, timer } from 'rxjs';
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

  getLabs(search: string = "") {
    this.labsService.fetchLabs(search)
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
    this.labsService.setKioskGroupId(item.kiosk_group_id.toString())
    this._router.navigate([`/main-app/${item.configuration}`]);
  }

  onSearch(searchTerm: string) {
    this.searchTermSubject.next(searchTerm);
  }

  ngOnDestroy(): void {
    this.searchTermSubject.unsubscribe();    
  }
}
