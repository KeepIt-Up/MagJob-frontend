import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsListComponent } from '../permissions-list.component';
import { RoleListComponent } from '../role-list/role-list.component';
import { Role } from '../../model/role';

@Component({
  selector: 'app-role-edit',
  standalone: true,
  imports: [CommonModule, PermissionsListComponent, RoleListComponent],
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.css']
})
export class RoleEditComponent {
  @Input() roleId?: string;
  role!: Role;
}
