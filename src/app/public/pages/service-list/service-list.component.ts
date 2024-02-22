import { IService } from '../../../shared/interfaces/service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject, debounce, take, timer } from 'rxjs';
import { IServiceTicket } from 'src/app/shared/interfaces/service-ticket';
import { ITicket } from 'src/app/shared/interfaces/ticket';
import { LabServicesService } from 'src/app/shared/services/lab-services.service';
import { PopupService } from 'src/app/shared/services/popup.service';
import { TicketsService } from 'src/app/shared/services/tickets.service';
import { successImageSelect } from 'src/app/shared/types/image-switch';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiceListComponent implements OnInit {


  services: IService[] = [];
  searchTerm: string = '';
  searchTermSubject = new Subject<string>();
  private configId: number | null = null;


  constructor(
    private _router: Router,
    private cdr: ChangeDetectorRef,
    private popupService: PopupService,
    private route: ActivatedRoute,
    private readonly labServicesService: LabServicesService,
    private readonly ticketServices: TicketsService,
    private translate: TranslateService
  ) {
    this.searchTermSubject
      .pipe(
        debounce(() => timer(3000))
      )
      .subscribe((searchTerm) => {
        console.log('Search term:', searchTerm);
        this.searchTerm = searchTerm;
        if (this.configId) {
          this.getLabRelatedServices(this.configId, this.searchTerm);
        }
      });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.configId = params.get('configId') ? Number(params.get('configId')) : null;
      if (this.configId) {
        this.getLabRelatedServices(this.configId);
      }
    });
  }

  getLabRelatedServices(configId: number, search: string = "") {
    console.log(this.configId, "----");
    this.labServicesService.fetchServices(configId, search).pipe(take(1)).subscribe({
      next: (res: any) => {
        console.log("FETCH SERVICES :", res);
        this.services = res.data;
        this.cdr.detectChanges();
        return { info: res.info, data: res.data }
      },
      error: (err) => {
        console.error("Error fetching services:", err);
        console.error('Error Info:', err.error.info);
      }
    });
  }

  createTicket(item: IService) {
    console.log("clicked on " + item.service_name);
    const serviceTicket: IServiceTicket = {
      service_id: item.service_id,
    };
    console.log("Ticket Object---", serviceTicket);

    this.ticketServices.createTicketWithService(serviceTicket).pipe(
      take(1)
    ).subscribe(async (ticketResponse) => {
      console.log("Ticket Response:", ticketResponse);
      if (ticketResponse && ticketResponse.info) {
        const ticket = ticketResponse.data as ITicket
        const info = ticketResponse.info;
        const translatedMessage = info
          ? this.translate.instant(`POPUP.ERROR_MESSAGES.${info}`)
          : this.translate.instant('POPUP.ERROR_MESSAGES.DEFAULT');
        const ImageSrc = successImageSelect(info);
        await this.popupService.openPopup(
          translatedMessage,
          ImageSrc
        );
        window.open(ticket.redirection_link, "_self");
      }
    })
  }

  onSearch(searchTerm: string) {
    this.searchTermSubject.next(searchTerm);
  }

  ngOnDestroy(): void {
    this.searchTermSubject.unsubscribe();
  }
}
