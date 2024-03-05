import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Register } from '../model/register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = '/api/users';

  constructor(private http: HttpClient) {}

  register(RegisterData: Register): Observable<any> {
    const registrationEndpoint = this.apiUrl;

    return this.http.post(registrationEndpoint, RegisterData);
  }
}
