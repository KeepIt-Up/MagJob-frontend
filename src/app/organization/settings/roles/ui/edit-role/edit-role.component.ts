import { Component, EventEmitter, Input, OnInit, Output, computed, inject, signal } from '@angular/core';
import { HeaderComponent } from './ui/header/header.component';
import { SectionsNavComponent } from './ui/sections-nav/sections-nav.component';
import { SectionType, SectionTypeValue } from '../../roles.component';
import { AppearanceComponent } from './ui/appearance/appearance.component';
import { PermissionsComponent } from './ui/permissions/permissions.component';
import { MembersManagementComponent } from './ui/members-management/members-management.component';
import { Observable } from 'rxjs';
import { RoleState } from '../../service/service/role.state.service';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-edit-role',
  standalone: true,
  imports: [HeaderComponent, SectionsNavComponent, AppearanceComponent, PermissionsComponent, MembersManagementComponent, AsyncPipe],
  templateUrl: './edit-role.component.html',
  styleUrl: './edit-role.component.css'
})
export class EditRoleComponent implements OnInit {
  @Input({required: true}) organizationId!: string;
  @Input({required: true}) state$!: Observable<RoleState>;
  @Output() changeSection = new EventEmitter<SectionTypeValue>();
  @Output() deleteRole = new EventEmitter<string>();
  @Output() assignMembers = new EventEmitter<string[]>();
  @Output() unassignMember = new EventEmitter<string>();
  SectionTypeValue = SectionType;

  membersCount$ = signal<number>(0);

  ngOnInit(): void {
    this.state$.subscribe({next: (state) => {
      if(state.selectedRole)
        {
          if(state.selectedRole.members)
            {
              this.membersCount$.set(state.selectedRole.members.length);
            }
            else {
          this.membersCount$.set(0);
            }
        }
    }});
  }

}
