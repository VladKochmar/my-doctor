import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterRequestInterface } from '../models/registerRequest.interface';
import { Observable } from 'rxjs';
import { AuthResponseInterface } from '../models/authResponse.interface';
import { environment } from '../../../environments/environment';
import { LogInRequestInterface } from '../models/loginRequest.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: RegisterRequestInterface): Observable<AuthResponseInterface> {
    const url = `${environment.apiUrl}/auth/signup`;
    return this.http.post<AuthResponseInterface>(url, data);
  }

  login(data: LogInRequestInterface): Observable<AuthResponseInterface> {
    const url = `${environment.apiUrl}/auth/login`;
    return this.http.post<AuthResponseInterface>(url, data);
  }
}
