import { Member } from './../model/member';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

export interface UpdateMemberPayload {
  pseudonym: string
}

@Injectable({
  providedIn: 'root'
})
export class OrganizationMembersService {
  //readonly apiUrl = 'http://localhost:8080/api/members'
  readonly apiUrl = 'api/members'


  constructor(private http: HttpClient) {}

  delete(memberId: number) {
    return this.http.delete(`${this.apiUrl}/${memberId}`).subscribe(
      (response) => {
        console.log('Response:', response);
      },
      (error) => {
        console.error('Error:', error);
      });
  }

  
  
  update(memberId: number, newPseudonym: string) {
    const payload: UpdateMemberPayload = {pseudonym: newPseudonym};
    return this.http.patch(`${this.apiUrl}/${memberId}`, payload);
    
  }
}
