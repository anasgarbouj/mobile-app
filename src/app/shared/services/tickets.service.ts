import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IServiceTicket } from '../interfaces/service-ticket';
import { IAppointmentTicket } from '../interfaces/appointment-ticket';
import { IResponse } from '../interfaces/api-response';
import { ITicket } from '../interfaces/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor() { }

  private baseUrl = environment.baseUrl;
  private readonly http = inject(HttpClient)

  retrieveTicket(id: number) {
    return this.http.get<IResponse<ITicket>>(`${this.baseUrl}/virtual_ticket/ticket/retrieve/${id}/`)
  }

  createTicketWithService(ticket: IServiceTicket) {
    return this.http.post<IResponse<ITicket>>(`${this.baseUrl}/virtual_ticket/ticket/create/service/`, ticket)
  }

  createTicketWithAppointment(ticket: IAppointmentTicket) {
    return this.http.post<IResponse<ITicket>>(`${this.baseUrl}/virtual_ticket/ticket/create/schedule-activity/`, ticket)
  }

  deleteTicket(id : number){
    return this.http.delete<IResponse<any>>(`${this.baseUrl}/virtual_ticket/ticket/delete/${id}/`)
  }
}
