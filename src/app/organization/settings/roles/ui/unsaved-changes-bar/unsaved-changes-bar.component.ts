import { Component, OnInit, inject } from '@angular/core';
import { RoleService } from '../../service/service/role.service';
import { RoleFormService } from '../../service/service/role-form.service';
import { combineLatest } from 'rxjs';
import { UpdateRolePayload } from '../../model/role';

@Component({
  selector: 'app-unsaved-changes-bar',
  standalone: true,
  imports: [],
  templateUrl: './unsaved-changes-bar.component.html',
  styleUrl: './unsaved-changes-bar.component.css'
})
export class UnsavedChangesBarComponent implements OnInit{
  private roleService = inject(RoleService);
  private roleFormService = inject(RoleFormService);
  changes:boolean = false;

  ngOnInit(): void {
    this.trackChanges();
  }

  trackChanges()
  {
    combineLatest([this.roleFormService.permissionForm.valueChanges, this.roleFormService.roleForm.valueChanges]).subscribe({next: (value) => {
      if(this.roleFormService.permissionForm.dirty || this.roleFormService.roleForm.dirty)
        {
          this.changes = true;
        }
      else {
        this.changes = false;
      }
    }})
  }

  saveChanges()
  {
    if(this.roleFormService.currentRole)
      {
        const payload: UpdateRolePayload = {
          name: this.roleFormService.roleForm.controls.name.value,
          canManageTasks: this.roleFormService.permissionForm.controls.canManageTasks.value,
          canManageAnnouncements: this.roleFormService.permissionForm.controls.canManageAnnouncements.value,
          canManageInvitations: this.roleFormService.permissionForm.controls.canManageInvitations.value,
          canManageRoles: this.roleFormService.permissionForm.controls.canManageRoles.value,
        }
        console.log(payload)
        this.roleService.update(this.roleFormService.currentRole.id, payload);
      }
  }

  discard()
  {
    this.roleFormService.resetForms();
  }
}
