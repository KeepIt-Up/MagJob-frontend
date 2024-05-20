import { Injectable } from '@angular/core';
import { Organization } from 'src/app/organization/model/organization';
import { Invitation } from 'src/app/invitations/model/invitation';
import { BehaviorSubject } from 'rxjs';

export type UserState = {
  organizations: Organization[];
  invitations: Invitation[];
  //roles: Role[]
};

const initialState = {
  organizations: [],
  invitations: [],
};

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  private state$ = new BehaviorSubject<UserState>(initialState);

  value$ = this.state$.asObservable();

  constructor() {}

  setOrganizations(organizations: Organization[]) {
    this.state$.next({
      invitations: this.state$.value.invitations,
      organizations: organizations,
    });
  }

  setInvitations(invitations: Invitation[]) {
    this.state$.next({
      invitations: invitations,
      organizations: this.state$.value.organizations,
    });
  }
}
