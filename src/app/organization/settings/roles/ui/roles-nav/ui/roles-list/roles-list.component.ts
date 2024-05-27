import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Role } from '../../../../model/role';

@Component({
  selector: 'app-roles-list',
  standalone: true,
  imports: [],
  templateUrl: './roles-list.component.html',
  styleUrl: './roles-list.component.css'
})
export class RolesListComponent {
 @Input({required: true}) roles!: Role[];
 @Input({required: true}) selectedRole!: Role;
 @Output() selected = new EventEmitter<string>();
}
