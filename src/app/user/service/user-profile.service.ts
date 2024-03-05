import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from '../model/user-profile';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  readonly apiUrl = '/api/users';

  constructor(private http: HttpClient) {}

  getUserProfile(userId: number): Observable<UserProfile> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<UserProfile>(url);
  }
}