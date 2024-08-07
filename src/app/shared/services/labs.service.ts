import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse, PResponse } from '../interfaces/api-response';
import { ILab } from '../interfaces/Lab';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class LabsService {
  private baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  setKioskGroupId(id: string) {
    localStorage.setItem("kiosk_group_id",id)
  }


  getKioskGroupIdValue(){
    return localStorage.getItem("kiosk_group_id")
  }

  public fetchLabs(params: HttpParams) {
    return this.http.get<PResponse<ILab>>(`${this.baseUrl}/virtual_ticket/geo-search/filter-labs/`, { params: params });
  }
  
}
