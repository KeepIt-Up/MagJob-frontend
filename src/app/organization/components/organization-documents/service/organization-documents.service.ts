import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class OrganizationDocumentsService {
  constructor(private http: HttpClient) {}

  getOrganizationMaterialsPreviews(organizationId: number): Observable<any> {
    return this.http.get<any>(`/api/organizations/${organizationId}/materials`);
  }
}