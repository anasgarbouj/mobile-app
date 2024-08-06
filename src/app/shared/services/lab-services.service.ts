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

  fetchServices(kioskgroupId : any, search:string=""){    
    return this.http.post<IResponse<IService>>(`${this.baseUrl}/virtual_ticket/service-list/?search=${search}`,{"kiosk_group_id":kioskgroupId})
  }
}
