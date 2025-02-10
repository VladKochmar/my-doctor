import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

import { DoctorServiceInterface } from '../../../shared/models/doctorService.interface';
import { ServicesResponseInterface } from '../../../shared/models/servicesResponse.interface';
import { DeleteResponseInterface } from '../../../shared/models/deleteResponse.interface';
import { ServiceTemplateInterface } from '../../../shared/models/serviceTemplate.interface';
import { TemplatesResponseInterface } from '../../../shared/models/templatesResponse.interface';
import { DoctorsServiceRequestInterface } from '../models/doctorsServiceRequest.interface';

@Injectable({ providedIn: 'root' })
export class DoctorsServicesService {
  constructor(private http: HttpClient) {}

  loadDoctorsServices(): Observable<DoctorServiceInterface[]> {
    const url = `${environment.apiUrl}/services/my`;
    return this.http
      .get<ServicesResponseInterface>(url)
      .pipe(map((response) => response.data));
  }

  loadTemplates(): Observable<ServiceTemplateInterface[]> {
    const url = `${environment.apiUrl}/service-templates`;
    return this.http
      .get<TemplatesResponseInterface>(url)
      .pipe(map((response) => response.data.documents));
  }

  editService(
    serviceData: DoctorsServiceRequestInterface,
    id: number | null = null
  ): Observable<string> {
    const url = `${environment.apiUrl}/services/form${id ? '/' + id : ''}`;
    return this.http
      .post<{ message: string }>(url, serviceData)
      .pipe(map((response) => response.message));
  }

  deleteDoctorsService(id: number): Observable<string> {
    const url = `${environment.apiUrl}/services`;
    return this.http
      .delete<DeleteResponseInterface>(url, { body: { id } })
      .pipe(map((response) => response.message));
  }
}
