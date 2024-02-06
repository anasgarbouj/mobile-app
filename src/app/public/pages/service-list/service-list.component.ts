import { IService } from './../../../shared/services/service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, of, take } from 'rxjs';
import { TicketServiceInfoMapper } from 'src/app/shared/commun/TicketServiceInfoMapper';
import { IServiceTicket } from 'src/app/shared/interfaces/service-ticket';
import { ITicket } from 'src/app/shared/interfaces/ticket';
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


  private configID : number =0;
  private kioskGroupId : number =0;
  private readonly labServices = inject(LabServicesService)
  private readonly ticketServices = inject(TicketsService);
  private ticketServiceInfoMapper = new TicketServiceInfoMapper(this.popupService)
  items: IService[]  = [];


  constructor(private _router: Router ,private cdr: ChangeDetectorRef , private popupService : PopupService) { }


  ngOnInit() {
    const config = this._router.getCurrentNavigation()?.extras.state?.['config'];
    const kioskId = this._router.getCurrentNavigation()?.extras.state?.['kioskId'];
    console.log("configId recieved from lab :",config);
    this.configID = config ;
    this.kioskGroupId = kioskId;
    this.getLabRelatedServices() ;
  }


  getLabRelatedServices(){
    this.labServices.fetchServices(this.configID).pipe(take(1))    .subscribe(
      (res : any) => {
        console.log("FETCH SERVICES :", res);
        this.items = res.data;
        this.cdr.detectChanges();
        return  { info: res.info, data: res.data }
      },
      (error) => {
        console.error("Error fetching services:", error);
        console.error('Error Info:', error.error.info);
      }
    );

  }

  navigateToEmail(item: IService) {
    console.log("clicked on " + item.service_name);

    const serviceTicket: IServiceTicket = {
      kiosk_group_id: this.kioskGroupId,
      service_id : item.service_id
    };

    this.ticketServices.createTicketWithService(serviceTicket).pipe(
      take(1),
      map(res => {
        console.log(res);
        return res;
      }),
      catchError(error => {
        console.error('Error creating ticket:', error);
        console.error('Error Info:', error.error.info);
        this.ticketServiceInfoMapper.mapErrorInfo(error.error.info)
        return of(null);
      })
    )
    .subscribe((ticketResponse) => {
        console.log("Ticket Response:", ticketResponse);
        if (ticketResponse && ticketResponse.info) {
          this.ticketServiceInfoMapper.mapSuccessInfo(ticketResponse.info);
          console.log("navigating to email confirmation");
          const ticket = ticketResponse.data as ITicket
          console.log("TICKET ID TO SEND ---",ticket.ticket_id);
          this._router.navigate(["/email-confirmation"] , {state : {ticketId : ticket.ticket_id}})        }
     }
    )

  }



}
