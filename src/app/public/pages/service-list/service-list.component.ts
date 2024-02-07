import { IService } from '../../../shared/interfaces/service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, of, take } from 'rxjs';
import { TicketServiceInfoMapper } from 'src/app/shared/commun/TicketServiceInfoMapper';
import { ILocation } from 'src/app/shared/interfaces/location';
import { IServiceTicket } from 'src/app/shared/interfaces/service-ticket';
import { ITicket } from 'src/app/shared/interfaces/ticket';
import { GeolocationService } from 'src/app/shared/services/geolocation.service';
import { LabServicesService } from 'src/app/shared/services/lab_services.service';
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
  private configId: number | null = null;
  private kioskGroupId: number | null = null;

  private ticketServiceInfoMapper = new TicketServiceInfoMapper(this.popupService)
  private currentPosition :ILocation | null = null;
  constructor(
    private _router: Router,
    private cdr: ChangeDetectorRef,
    private popupService: PopupService,
    private route: ActivatedRoute,
    private readonly labServices : LabServicesService,
    private readonly ticketServices: TicketsService,
    private readonly geolocationService : GeolocationService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.kioskGroupId = params.get('kioskGroupId') ? Number(params.get('kioskGroupId')) : null;
      this.configId = params.get('configId') ? Number(params.get('configId')) : null;
      if(this.configId && this.kioskGroupId){
        this.getLabRelatedServices(this.configId , this.kioskGroupId);
      }
    });


  }

  async getLabRelatedServices(configId: number ,  kioskId : number) {
    try {
      const position = await this.geolocationService.getCurrentPosition();
      console.log("Current user position is: ", position);
      this.currentPosition = position as ILocation;
    } catch (error) {
      console.log("Error getting current position", error);
    }
    console.log(this.configId,"----",this.kioskGroupId,"----",this.currentPosition);
    this.labServices.fetchServices(configId , this.currentPosition, kioskId).pipe(take(1)).subscribe({
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

  navigateToEmail(item: IService) {
    console.log("clicked on " + item.service_name);
    if (this.kioskGroupId) {
      const serviceTicket: IServiceTicket = {
        kiosk_group_id: this.kioskGroupId,
        service_id: item.service_id,
        current_position : this.currentPosition
      };
      console.log("Ticket Object---",serviceTicket);

      this.ticketServices.createTicketWithService(serviceTicket).pipe(
        take(1),
        map(res => {
          return res;
        }),
        catchError(error => {
          console.error('Error creating ticket:', error);
          console.error('Error Info:', error.error.info);
          this.ticketServiceInfoMapper.mapErrorInfo(error.error.info)
          return of(null);
        })
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

}
