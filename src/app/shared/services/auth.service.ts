import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PEmail } from '../interfaces/email';
import { IResponse } from '../interfaces/api-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;

  constructor(
    private readonly http: HttpClient
  ) { }

  sendPatientLoginEmail(email: PEmail) {
    return this.http.post<IResponse<any>>(`${this.baseUrl}/virtual_ticket/patient-auth/`, email)
  }
}
