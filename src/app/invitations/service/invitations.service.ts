import { Invitation } from './../model/invitation';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AcceptInvitationRequest } from '../model/accept-invitation-request';
import { RejectInvitationRequest } from '../model/reject-invitation-request';

@Injectable({
  providedIn: 'root',
})
export class InvitationsService {
  readonly apiUrl = '/api/invitations';

  constructor(private http: HttpClient) {}

  getInvitations(userId: string): Observable<any> {
    return this.http.get<any>(`/api/users/${userId}/invitations`);
  }

  invite(invitation: Invitation) {
    return this.http.post(this.apiUrl, invitation).pipe(
      catchError((error: any) => {
        console.error('Error occurred:', error);
        throw error;
      })
    );
  }

  accept(acceptInvitationRequest: AcceptInvitationRequest): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/accept`,
      acceptInvitationRequest
    );
  }

  reject(invitation: RejectInvitationRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reject`, invitation);
  }
}
