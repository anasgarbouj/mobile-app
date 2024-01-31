import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IResponse } from '../interfaces/api-response';
import { ILocation } from '../interfaces/location';
import { ILab } from '../interfaces/Lab';



@Injectable({
  providedIn: 'root'
})
export class LabsService {

  private baseUrl : string = "http://192.168.1.106:9000/ui";
  constructor() { }
  private readonly http = inject(HttpClient)
  public fetchLabs(location:ILocation,search:string=''){
    return this.http.get<IResponse<ILab>>(`${this.baseUrl}/virtual_ticket/geo-search-sites/?lat=${location.lat}&long=${location.long}&search=${search}`)
  }
}
