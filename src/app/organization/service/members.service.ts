import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  private _httpClient = inject(HttpClient);

  constructor() {}

  getAllByOrganization(organizationId: string) {
    return this._httpClient.get<any>(
      `api/organizations/${organizationId}/members`,
      { observe: 'response' }
    );
  }

  getMemberById(memberId: string) {
    return this._httpClient.get<any>(`api/members/${memberId}`, {
      observe: 'response',
    });
  }
}
