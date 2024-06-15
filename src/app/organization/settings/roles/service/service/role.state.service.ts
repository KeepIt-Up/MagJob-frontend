import { Injectable, inject, signal } from '@angular/core';
import { BehaviorSubject, tap, throwError } from 'rxjs';
import { Role } from '../../model/role';
import { FormGroup } from '@angular/forms';
import { RoleFormService } from './role-form.service';
import { SectionTypeValue } from '../../roles.component';

export type RoleState = {
  roles: Role[],
  selectedRole: Role | undefined,
  forms: FormGroup[],
  selectedSection: SectionTypeValue
}

const initialState = {
  roles: [],
  selectedRole: undefined,
  forms: [],
  selectedSection: "APPEARANCE" as SectionTypeValue
}

@Injectable({
  providedIn: 'root'
})
export class RoleStateService {
  private roleFormService = inject(RoleFormService);
  constructor() 
  { 
    this.roleFormService.value$.subscribe({next:(value) => {
      this.state$.next({
        ...this.state$.value,
        forms: value
      })
    }})
  }

  private state$ = new BehaviorSubject<RoleState>(initialState);

  value$ = this.state$.asObservable();

  addRole(role: Role)
  {
    this.state$.next({
      ...this.state$.value,
      roles: [...this.state$.value.roles, role]
    });
  }

  setRoles(roles: Role[])
  {
    this.roleFormService.setForms(roles[0]);
    this.state$.next({
      ...this.state$.value,
      selectedRole: roles[0],
      roles: roles,
    });
  }

  removeRole(roleId: string)
  {
    const updatedRoles = this.state$.value.roles.filter((role) => {
      return role.id != roleId;
    });

    this.state$.next({
      ...this.state$.value,
      roles: updatedRoles
    });
  }

  updateRole(updatedRole: Role)
  {
    const updatedRoles = this.state$.value.roles.map((role) => {
      return role.id === updatedRole.id ? updatedRole : role;
    });

    this.state$.next({
      ...this.state$.value,
      roles: updatedRoles
    });
  }

  setSelectedRole(roleId: string)
  {
    this.state$.next({
      ...this.state$.value,
      selectedRole: this.state$.value.roles.find(item => item.id == roleId)
    });

    if(this.state$.value.selectedRole)
      {
        this.roleFormService.setForms(this.state$.value.selectedRole);
      }
      else {
        throwError(()=> {
          console.error("NOT FOUND ROLE OF GIVEN ID");
        })
      }
  }

  changeSection(sectionType: SectionTypeValue)
  {
    this.state$.next({
      ...this.state$.value,
      selectedSection: sectionType
    });
  }
}
