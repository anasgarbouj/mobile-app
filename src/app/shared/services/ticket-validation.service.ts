import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketValidationService {

  private baseUrl: string = environment.baseUrl;

  constructor( private readonly http: HttpClient) { }

  public sendTicketValidation(ticket_id : number|null){
    return this.http.post<any>(`${this.baseUrl}/virtual_ticket/ticket/validate/`,ticket_id)
  }

}
