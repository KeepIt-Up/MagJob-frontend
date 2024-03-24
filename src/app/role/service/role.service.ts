import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../model/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private _http = inject(HttpClient);
  apiEndpoint:string = "/role";

  get(roleId: number): Observable<Role>
  {
    return this._http.get<Role>(`${this.apiEndpoint}/${roleId}`);
  }
  getAll(): Observable<Role[]>
  {
    return this._http.get<Role[]>(this.apiEndpoint);
  }

  create(roleId: number, role: Role): Observable<Role>
  {
    return this._http.post<Role>(this.apiEndpoint, role);
  }

  update(roleId: number, role: Role): Observable<Role>
  {
    return this._http.put<Role>(`${this.apiEndpoint}/${roleId}`, role);
  }

  delete(roleId: number): Observable<any>
  {
    return this._http.delete<any>(`${this.apiEndpoint}/${roleId}`);
  }
}
