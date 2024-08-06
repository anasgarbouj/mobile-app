import { HttpParams } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject, debounce, map, take, timer } from 'rxjs';
import { ILab } from 'src/app/shared/interfaces/Lab';
import { LabsService } from 'src/app/shared/services/labs.service';
import { PopupService } from 'src/app/shared/services/popup.service';
import { errorImageSelect } from 'src/app/shared/types/image-switch';


@Component({
  selector: 'app-labs',
  templateUrl: './labs.component.html',
  styleUrls: ['./labs.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabsComponent implements OnInit {
  laboName: any;
  labs: ILab[] = [];
  searchTerm: string = '';
  searchTermSubject = new Subject<string>();

  currentPage = 1;
  pageSize = 5;
  totalItems: number = 0;

  constructor(
    private _router: Router,
    private readonly labsService: LabsService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private popupService: PopupService,
    private translate: TranslateService,
    private router: Router,
  ) {
    this.searchTermSubject
      .pipe(
        debounce(() => timer(1000))
      )
      .subscribe((searchTerm) => {
        this.searchTerm = searchTerm;
        this.getLabs()
      });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.laboName = params['laboName'] || null;

      if (this.laboName) {
        this.navigateToIdentificationLabo();
      } else {
        this.getLabs();
      }
    });
  }

  getLabs(page: number = 1) {
    let httpParams = new HttpParams();
    httpParams = httpParams.set("page", page);
    httpParams = httpParams.set("size", this.pageSize);
    httpParams = httpParams.set("search", this.searchTerm);

    this.labsService.fetchLabs(httpParams)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.labs = response.data as ILab[];
          this.totalItems = response.count;
          this.cdr.detectChanges();
        }
      });
  }

  onPageChange(page: number) {
    this.getLabs(page)
  }

  navigateToIdentification(item: ILab) {
    this.labsService.setKioskGroupId(item.kiosk_group_id.toString())
    this._router.navigate([`/ticket-type`]);
  }

  navigateToIdentificationLabo() {
    let params = new HttpParams().set('virtual_code', this.laboName);
    this.labsService
      .fetchLabs(params)
      .pipe(
        take(1),
        map((res) => {
          return { info: res.info, data: res.data };
        })
      )
      .subscribe({
        next: (response) => {
          const lab = response.data as ILab[];
          // console.log(lab.length);
          if (lab.length){
            // console.log("labo found");
            this.labsService.setKioskGroupId(lab[0].kiosk_group_id.toString());
            this.ngOnDestroy()
            this._router.navigate([`service-list`]);
          }
          else {
            // console.log("0 labo found")
            this.router.navigate(['/'])
            .then(() => {
              window.location.reload();
            });
          };
          
          
        },
        error: async (err) => {
          const info = err.error?.info ? err.error.info : '';
          const translatedErrorMessage = info
            ? this.translate.instant(`POPUP.ERROR_MESSAGES.${info}`)
            : this.translate.instant('POPUP.ERROR_MESSAGES.DEFAULT');
          const errorImageSrc = errorImageSelect(info);
          await this.popupService.openPopup(translatedErrorMessage, errorImageSrc);
        },
      });
  }

  onSearch(searchTerm: string) {
    this.searchTermSubject.next(searchTerm);
  }

  ngOnDestroy(): void {
    this.searchTermSubject.unsubscribe();
  }
}
