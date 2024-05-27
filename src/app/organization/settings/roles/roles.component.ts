import { Component, OnInit, inject } from '@angular/core';
import { EditRoleComponent } from './ui/edit-role/edit-role.component';
import { RolesNavComponent } from './ui/roles-nav/roles-nav.component';
import { UnsavedChangesBarComponent } from './ui/unsaved-changes-bar/unsaved-changes-bar.component';
import { RoleService } from './service/service/role.service';
import { AsyncPipe } from '@angular/common';

export const SectionType = {
  APPEARANCE: "APPEARANCE",
  PERMISSIONS: "PERMISSIONS",
  MEMBERS_MANAGEMENT: "MEMBERS_MANAGEMENT"
} as const;
export type SectionTypeValue = keyof typeof SectionType;


@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [EditRoleComponent, RolesNavComponent, UnsavedChangesBarComponent, AsyncPipe],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit {
  private roleService = inject(RoleService);

  listState$ = this.roleService.listState$;
  rolesState$ = this.roleService.state$;
  ngOnInit(): void {
    this.roleService.getAll();
  }

  changeSelectedRole(id: string)
  {
    this.roleService.changeSelectedRole(id);
  }

}
