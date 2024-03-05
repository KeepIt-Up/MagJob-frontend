import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { OrganizationCreation } from '../../../model/organization-creation';

@Injectable({
  providedIn: 'root'
})
export class OrganizationCreationService {
  private apiUrl = '/api/organizations';

  constructor(private http: HttpClient) {}

  createOrganization(organizationData: OrganizationCreation): Observable<any> {
    const registrationEndpoint = this.apiUrl;
    return this.http.post(registrationEndpoint, organizationData);
  }
}
