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
  private baseUrl: string = environment.baseUrl;

  constructor() { }

  private readonly http = inject(HttpClient)

  public fetchLabs(search: string = '') {
    return this.http.get<IResponse<ILab>>(`${this.baseUrl}/virtual_ticket/geo-search/filter-labs/?search=${search}`)
  }

  public fetchLabsByQrCode(qrCodeValue: string = '') {
    return this.http.get<IResponse<ILab>>(`${this.baseUrl}/virtual_ticket/geo-search/scan-qr/?virtual_code=${qrCodeValue}`)
  }
}
