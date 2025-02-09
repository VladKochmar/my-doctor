import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

import { DoctorServiceInterface } from '../../../shared/models/doctorService.interface';
import { ServicesResponseInterface } from '../../../shared/models/servicesResponse.interface';
import { DeleteResponseInterface } from '../../../shared/models/deleteResponse.interface';

@Injectable({ providedIn: 'root' })
export class DoctorsServicesService {
  constructor(private http: HttpClient) {}

  loadDoctorsServices(): Observable<DoctorServiceInterface[]> {
    const url = `${environment.apiUrl}/services/my`;
    return this.http
      .get<ServicesResponseInterface>(url)
      .pipe(map((response) => response.data));
  }

  deleteDoctorsService(id: number): Observable<string> {
    const url = `${environment.apiUrl}/services`;
    return this.http
      .delete<DeleteResponseInterface>(url, { body: { id } })
      .pipe(map((response) => response.message));
  }
}
