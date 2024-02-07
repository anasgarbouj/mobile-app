import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IService } from '../interfaces/service';
import { IResponse } from '../interfaces/api-response';
import { ILocation } from '../interfaces/location';

@Injectable({
  providedIn: 'root'
})
export class LabServicesService {

  private baseUrl : string = environment.baseUrl;

  constructor(
    private readonly http: HttpClient
  ) { }

  fetchServices(configId : number , position : ILocation|null , kioskGroupId : number){
    return this.http.get<IResponse<IService>>(`${this.baseUrl}/virtual_ticket/service-list/${configId}/?lat=${position?.lat}&long=${position?.long}&kioskGroupId=${kioskGroupId}`)
  }
}
