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


  setTicketId(id: any) {
    localStorage.setItem("ticket_id",id)
  }


  getTicketId(){
    return localStorage.getItem("ticket_id")
  }

  setTicketToken(id: any) {
    localStorage.setItem("token",id)
  }


  getTicketToken(){
    return localStorage.getItem("token")
  }

  retrieveTicket(val:any) {
    return this.http.post<IResponse<ITicket>>(`${this.baseUrl}/virtual_ticket/ticket/retrieve/`,val)
  }
  public sendTicketValidation(val:any){
    return this.http.post<any>(`${this.baseUrl}/virtual_ticket/ticket/validate/`, val)
  }

  createTicketWithService(ticket: IServiceTicket) {
    return this.http.post<IResponse<ITicket>>(`${this.baseUrl}/virtual_ticket/ticket/create/service/`, ticket)
  }

  createTicketWithAppointment(ticket: IAppointmentTicket) {
    return this.http.post<IResponse<ITicket>>(`${this.baseUrl}/virtual_ticket/ticket/create/schedule-activity/`, ticket)
  }

  deleteTicket(val:any){
    return this.http.post<IResponse<any>>(`${this.baseUrl}/virtual_ticket/ticket/delete/`,val)
  }
}
