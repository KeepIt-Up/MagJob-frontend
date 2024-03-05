import { Invitation } from './../model/invitation';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AcceptInvitationRequest } from '../model/AcceptInvitationRequest';

@Injectable({
  providedIn: 'root'
})
export class InvitationsService {
  readonly apiUrl = '/api/invitations';

  constructor(private http: HttpClient) {}

  getInvitations(userId: number): Observable<any>
  {
    return this.http.get<any>(`/api/users/${userId}/invitations`);
  }

  invite(invitation: Invitation) {
    return this.http.post(this.apiUrl, invitation)
      .pipe(
        catchError((error: any) => {
          console.error('Error occurred:', error);
          throw error; 
        })
      );
  }

  accept(acceptInvitationRequest: AcceptInvitationRequest)
  {
    const rejectEndpoint = this.apiUrl + '/accept';
    return this.http.post(rejectEndpoint, acceptInvitationRequest);
  }

  reject(invitation: Invitation)
  {
    const rejectEndpoint = this.apiUrl + '/reject';
    return this.http.post(rejectEndpoint, invitation);
  }
}
