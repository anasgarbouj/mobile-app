import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IEmail } from '../interfaces/email';
import { IResponse } from '../interfaces/api-response';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private baseUrl : string = environment.baseUrl;
  private readonly http = inject(HttpClient)

  constructor() { }

  sendTicketViaEmail(email : IEmail){
    return this.http.post<IResponse<any>>(`${this.baseUrl}/virtual_ticket/ticket-email/`,email)
  }

}
