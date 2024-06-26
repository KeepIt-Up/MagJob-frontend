import { Injectable, inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Role } from '../../model/role';

export type RoleForm = FormGroup<{
  name: FormControl<string>;
}>;

export type RoleFormValue = ReturnType<RoleForm['getRawValue']>;

export type PermissionForm = FormGroup<{
  canManageTasks: FormControl<boolean>;
  canManageAnnouncements: FormControl<boolean>;
  canManageInvitations: FormControl<boolean>;
  canManageRoles: FormControl<boolean>;
}>;

export type PermissionFormValue = ReturnType<PermissionForm['getRawValue']>;

@Injectable({
  providedIn: 'root',
})
export class RoleFormService {
  private formBuilder = inject(NonNullableFormBuilder);

  roleForm: RoleForm = this.formBuilder.group({
    name: this.formBuilder.control<string>(''),
  });

  permissionForm: PermissionForm = this.formBuilder.group({
    canManageAnnouncements: this.formBuilder.control<boolean>(false),
    canManageTasks: this.formBuilder.control<boolean>(false),
    canManageInvitations: this.formBuilder.control<boolean>(false),
    canManageRoles: this.formBuilder.control<boolean>(false),
  });

  currentRole?: Role;

  private state$: BehaviorSubject<FormGroup[]>;

  value$: Observable<FormGroup[]>;

  constructor() {
    this.state$ = new BehaviorSubject<FormGroup[]>([]);
    this.value$ = this.state$.asObservable();
  }

  private setPermissionForm(role: Role) {
    this.permissionForm.setValue({
      canManageAnnouncements: role.canManageAnnouncements,
      canManageInvitations: role.canManageInvitations,
      canManageRoles: role.canManageRoles,
      canManageTasks: role.canManageTasks,
    });
  }

  private setRoleForm(role: Role) {
    this.roleForm.setValue({
      name: role.name,
    });
  }

  setForms(role: Role) {
    this.currentRole = role;
    this.setRoleForm(role);
    this.setPermissionForm(role);

    this.state$.next([this.roleForm, this.permissionForm]);
  }

  resetForms() {
    if (this.currentRole) {
      this.setForms(this.currentRole);
    } else {
      console.error("Cannot reset forms because no role is selected");
    }
  }
}
