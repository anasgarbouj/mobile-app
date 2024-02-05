import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IServiceTicket } from '../interfaces/service-ticket';
import { IAppointmentTicket } from '../interfaces/appointment-ticket';
import { IResponse } from '../interfaces/api-response';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor() { }

  private baseUrl = environment.baseUrl;
  private readonly http = inject(HttpClient)

  createTicketWithService(ticket : IServiceTicket){
    return this.http.post<IResponse<any>>(`${this.baseUrl}/virtual_ticket/create-ticket/service/`,ticket)
  }

  createTicketWithAppointment(ticket : IAppointmentTicket){
    return this.http.post<IResponse<any>>(`${this.baseUrl}/virtual_ticket/create-ticket/schedule-activity/`,ticket)
  }


}
