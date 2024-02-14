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

  fetchServices(configId : number, search:string=""){
    const timezoneOffset = new Date().getTimezoneOffset();    
    const timezone = `${timezoneOffset > 0 ? 'M' : 'P'}${(Math.floor(Math.abs(timezoneOffset) / 60)).toString().padStart(2, '0')}:${(Math.abs(timezoneOffset) % 60).toString().padStart(2, '0')}`;    
    
    return this.http.get<IResponse<IService>>(`${this.baseUrl}/virtual_ticket/service-list/${configId}/?timezone_offset=${timezone}&search=${search}`)
  }
}
