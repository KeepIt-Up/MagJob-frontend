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

  register(register: Register): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, register);
  }
}
