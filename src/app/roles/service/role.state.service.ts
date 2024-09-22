import { Injectable, signal } from '@angular/core';
import {Role, RoleResponse} from '../model/role';
import { BehaviorSubject } from 'rxjs';

export type RoleState = {
  roles: Role[]
}

const initialState = {
  roles: []
}

@Injectable({
  providedIn: 'root'
})
export class RoleStateService {

  constructor() { }

  private state$ = new BehaviorSubject<RoleState>(initialState);

  value$ = this.state$.asObservable();

  addRole(role: Role)
  {
    this.state$.next({
      roles: [...this.state$.value.roles, role]
    });
  }

  setRoles(roles: Role[])
  {
    this.state$.next({
      roles
    });
  }

  removeRole(roleId: string)
  {
    const updatedRoles = this.state$.value.roles.filter((role) => {
      return role.id.toString() !== roleId;
    });

    this.state$.next({
      roles: updatedRoles
    });
  }

  updateRole(updatedRole: Role)
  {
    const updatedRoles = this.state$.value.roles.map((role) => {
      return role.id === updatedRole.id ? updatedRole : role;
    });

    this.state$.next({
      roles: updatedRoles
    });
  }
}
