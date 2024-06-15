import { Component, Input, OnInit, inject } from '@angular/core';
import { EditRoleComponent } from './ui/edit-role/edit-role.component';
import { RolesNavComponent } from './ui/roles-nav/roles-nav.component';
import { UnsavedChangesBarComponent } from './ui/unsaved-changes-bar/unsaved-changes-bar.component';
import { RoleService } from './service/service/role.service';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Role } from './model/role';

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
  @Input() organizationId!: string;
  private roleService = inject(RoleService);
  private route = inject(ActivatedRoute)
  listState$ = this.roleService.listState$;
  rolesState$ = this.roleService.state$;

  routeSub?: Subscription;

  private currentSelectedRole?: Role;

  constructor() {
    
  }

  ngOnInit(): void {
    this.route.parent?.parent?.paramMap.subscribe({
      next: (value) => {
        const organizationId = value.get('organizationId');
        if (organizationId !== null) {
          this.organizationId = organizationId;
        } else {
          alert('Error while getting organizationId from route');
        }
      },
      error: (err) =>
        {
          console.log(err)
        }
    });
    
    this.roleService.getAllByOrganization(this.organizationId);

    this.rolesState$.subscribe({next: (state) => {
      if(state.selectedRole)
        {
          this.currentSelectedRole = state.selectedRole;
        }
    }})
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  changeSelectedRole(id: string)
  {
    this.roleService.changeSelectedRole(id);
  }

  changeSection(SectionType: SectionTypeValue)
  {
    this.roleService.changeSection(SectionType);
  }

  createNewRole(roleName: string)
  {
    this.roleService.create(this.organizationId, roleName);
  }

  deleteRole(roleId: string)
  {
    this.roleService.delete(roleId);
  }

  assignMembers(membersIds: string[])
  {
    if(this.currentSelectedRole)
      {
        this.roleService.assignMembers(membersIds, this.currentSelectedRole.id);

      }
  }

  unassignMember(memberId: string)
  {
    if(this.currentSelectedRole)
      {
        this.roleService.unassignMember(memberId, this.currentSelectedRole.id);
      }
  }
}
