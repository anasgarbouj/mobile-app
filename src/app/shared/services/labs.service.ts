import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IResponse } from '../interfaces/api-response';
import { ILocation } from '../interfaces/location';
import { ILab } from '../interfaces/Lab';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class LabsService {

  private baseUrl : string = environment.baseUrl;
  constructor() { }
  private readonly http = inject(HttpClient)
  public fetchLabs(location:ILocation,search:string=''){
    return this.http.get<IResponse<ILab>>(`${this.baseUrl}/virtual_ticket/geo-search-sites/?lat=${location.lat}&long=${location.long}&search=${search}`)
  }

  public fetchLabsByQrCode(location:ILocation,qrCodeValue:string=''){
    return this.http.get<IResponse<ILab>>(`${this.baseUrl}/virtual_ticket/geo-search-sites/?lat=${location.lat}&long=${location.long}&virtual_code=${qrCodeValue}`)
  }
}
