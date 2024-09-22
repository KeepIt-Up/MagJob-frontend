import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {MemberRole} from "../model/member-role";

export type MemberRoleState = {
  memberRoles: MemberRole[]
}

const initialState = {
  memberRoles: []
}

@Injectable({
  providedIn: 'root'
})
export class MemberRoleStateService {

  constructor() { }

  private state$ = new BehaviorSubject<MemberRoleState>(initialState);

  value$ = this.state$.asObservable();

  addRoleMember(memberRole: MemberRole)
  {
    this.state$.next({
      memberRoles: [...this.state$.value.memberRoles, memberRole]
    });
  }

  setRoleMembers(memberRoles: MemberRole[])
  {
    this.state$.next({
      memberRoles
    });
  }

  removeRole(memberId: string, roleId: string)
  {
    const updatedMemberRoles = this.state$.value.memberRoles.filter((memberRoles) => {
      return memberRoles.memberId.toString() !== memberId;
    });

    this.state$.next({
      memberRoles: updatedMemberRoles
    });
  }
}
