import { Organization } from './../model/organization';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private currentOrganizationId: number | null = null;

  private apiUrl = '/api/organizations';
  constructor(private http: HttpClient) { }

  getAllOrganizations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getUserOrganizations(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${userId}`);
  }

  getMembers(organizationId: number): Observable<any>
  {
    return this.http.get<any>(`${this.apiUrl}/${organizationId}/members`);
  }

  getCurrentOrganizationId(): number {
    if(this.currentOrganizationId == null)
    {
      this.currentOrganizationId =  parseInt(localStorage.getItem("Organization") || '0');
    }
    return this.currentOrganizationId;
  }

  setCurrentOrganizationId(organization: Organization): void {
    this.currentOrganizationId = organization.id;
    localStorage.setItem("Organization",this.currentOrganizationId.toString());
  }

  clearCurrentOrganization(): void {
    this.currentOrganizationId = null;
  }
}
