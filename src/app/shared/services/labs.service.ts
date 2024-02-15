import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from '../interfaces/api-response';
import { ILab } from '../interfaces/Lab';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LabsService {
  private kioskGroupIdSubject = new BehaviorSubject<string | null>(null);
  private baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  setKioskGroupId(id: string) {
    this.kioskGroupIdSubject.next(id);
  }

  getKioskGroupId() {
    return this.kioskGroupIdSubject.asObservable();
  }

  checkKioskGroupId(): boolean {
    return this.kioskGroupIdSubject.value ? true : false;
  }

  public fetchLabs(search: string = '') {
    let params = new HttpParams().set('search', search);
    return this.http.get<IResponse<ILab>>(`${this.baseUrl}/virtual_ticket/geo-search/filter-labs/`, { params: params });
  }

  public fetchLabsByQrCode(qrCodeValue: string = '') {
    let params = new HttpParams().set('virtual_code', qrCodeValue);
    return this.http.get<IResponse<ILab>>(`${this.baseUrl}/virtual_ticket/geo-search/scan-qr/`, { params: params })
  }
}
