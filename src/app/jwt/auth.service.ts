import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../login/model/login'


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private jwtHelper = new JwtHelperService();
  readonly apiUrl = '/api/users';
  constructor(private http: HttpClient) {}

  login(loginData: Login): Observable<any> {

    const loginEndpoint = `${this.apiUrl}/login`;
    return this.http.post(loginEndpoint, loginData);
  }

  logout() {
    // Clear token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('User');
    localStorage.removeItem('Organization');
  }

  isAuthenticated(): boolean {
    // Check if token is expired
    const token = localStorage.getItem('access_token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
}
