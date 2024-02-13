import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IService } from '../interfaces/service';
import { IResponse } from '../interfaces/api-response';

@Injectable({
  providedIn: 'root'
})
export class LabServicesService {

  private baseUrl : string = environment.baseUrl;

  constructor(
    private readonly http: HttpClient
  ) { }

  fetchServices(configId : number , kioskGroupId : number,search:string=""){
    return this.http.get<IResponse<IService>>(`${this.baseUrl}/virtual_ticket/service-list/${configId}/?kioskGroupId=${kioskGroupId}/?search=${search}`)
  }
}
