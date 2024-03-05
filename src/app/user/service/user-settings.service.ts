import { PasswordChange } from './../model/password-change';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {
  private apiUrl = '/api/users';

  constructor(private http: HttpClient) {}

  updateUserPassword(passwordChange: PasswordChange, userId: number): Observable<PasswordChange> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.put<PasswordChange>(url, passwordChange);
  }
}
