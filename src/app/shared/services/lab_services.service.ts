import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IService } from './service';
import { IResponse } from '../interfaces/api-response';

@Injectable({
  providedIn: 'root'
})
export class LabServicesService {

  private baseUrl : string = environment.baseUrl;
  private readonly http = inject(HttpClient)

  constructor() { }

  fetchServices(configId : number){
    return this.http.get<IResponse<IService>>(`${this.baseUrl}/virtual_ticket/service-list/${configId}/`)
  }
}
