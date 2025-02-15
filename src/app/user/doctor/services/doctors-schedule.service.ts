import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DoctorsScheduleInterface } from '../models/doctorsSchedule.interface';
import { environment } from '../../../../environments/environment';
import { DoctorsScheduleResponseInterface } from '../models/doctorsScheduleResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class DoctorsScheduleService {
  private http = inject(HttpClient);

  loadDoctorsSchedule(): Observable<DoctorsScheduleInterface[]> {
    const url = `${environment.apiUrl}/schedules/my`;
    return this.http
      .get<DoctorsScheduleResponseInterface>(url)
      .pipe(map((response) => response.data));
  }

  saveDoctorsSchedule(
    schedulesData: DoctorsScheduleInterface[]
  ): Observable<string> {
    const url = `${environment.apiUrl}/schedules/update`;
    return this.http
      .post<{ message: string }>(url, { schedules: schedulesData })
      .pipe(map((response) => response.message));
  }
}
