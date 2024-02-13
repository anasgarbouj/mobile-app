import { IService } from '../../../shared/interfaces/service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, debounce, take, timer } from 'rxjs';
import { TicketServiceInfoMapper } from 'src/app/shared/commun/TicketServiceInfoMapper';
import { IServiceTicket } from 'src/app/shared/interfaces/service-ticket';
import { ITicket } from 'src/app/shared/interfaces/ticket';
import { LabServicesService } from 'src/app/shared/services/lab-services.service';
import { PopupService } from 'src/app/shared/services/popup.service';
import { TicketsService } from 'src/app/shared/services/tickets.service';

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
  private kioskGroupId: number | null = null;

  private ticketServiceInfoMapper = new TicketServiceInfoMapper(this.popupService)

  constructor(
    private _router: Router,
    private cdr: ChangeDetectorRef,
    private popupService: PopupService,
    private route: ActivatedRoute,
    private readonly labServicesService: LabServicesService,
    private readonly ticketServices: TicketsService,
  ) {
    this.searchTermSubject
      .pipe(
        debounce(() => timer(3000))
      )
      .subscribe((searchTerm) => {
        console.log('Search term:', searchTerm);
        this.searchTerm = searchTerm;
        if (this.configId && this.kioskGroupId) {
          this.getLabRelatedServices(this.configId, this.kioskGroupId, this.searchTerm);
        }
      });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.kioskGroupId = params.get('kioskGroupId') ? Number(params.get('kioskGroupId')) : null;
      this.configId = params.get('configId') ? Number(params.get('configId')) : null;
      if (this.configId && this.kioskGroupId) {
        this.getLabRelatedServices(this.configId, this.kioskGroupId);
      }
    });
  }

  getLabRelatedServices(configId: number, kioskId: number, search: string = "") {
    console.log(this.configId, "----", this.kioskGroupId);
    this.labServicesService.fetchServices(configId, kioskId, search).pipe(take(1)).subscribe({
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
    if (this.kioskGroupId) {
      const serviceTicket: IServiceTicket = {
        kiosk_group_id: this.kioskGroupId,
        service_id: item.service_id,
      };
      console.log("Ticket Object---", serviceTicket);

      this.ticketServices.createTicketWithService(serviceTicket).pipe(
        take(1)
      ).subscribe((ticketResponse) => {
        console.log("Ticket Response:", ticketResponse);
        if (ticketResponse && ticketResponse.info) {
          this.ticketServiceInfoMapper.mapSuccessInfo(ticketResponse.info);
          console.log("navigating to email confirmation");
          const ticket = ticketResponse.data as ITicket
          console.log("TICKET ID TO SEND ---", ticket.ticket_id);
          this._router.navigate([`/email-confirmation/${ticket.ticket_id}/${this.kioskGroupId}`])
        }
      })
    }
    else {
      console.log("kioskGroupId value ERROR: ", this.kioskGroupId);
    }
  }

  onSearch(searchTerm: string) {
    this.searchTermSubject.next(searchTerm);
  }

  ngOnDestroy(): void {
    this.searchTermSubject.unsubscribe();
  }
}
