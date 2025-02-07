import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CurrentUserInterface } from '../../shared/models/currentUser.interface';
import { UserResponseInterface } from '../models/userResponse.interface';
import { UserOperationsResponseInterface } from '../models/userOperationsResponse.interface';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  loadUser(): Observable<CurrentUserInterface> {
    const url = `${environment.apiUrl}/users/me`;
    return this.http
      .get<UserResponseInterface>(url)
      .pipe(map((response) => response.user));
  }

  updateUser(userData: FormData): Observable<UserOperationsResponseInterface> {
    const url = `${environment.apiUrl}/users/update`;
    return this.http.post<UserOperationsResponseInterface>(url, userData);
  }

  deleteUser(): Observable<UserOperationsResponseInterface> {
    const url = `${environment.apiUrl}/users`;
    return this.http.delete<UserOperationsResponseInterface>(url);
  }
}
