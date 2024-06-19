import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RolesListComponent } from './ui/roles-list/roles-list.component';
import { RouterLink } from '@angular/router';
import { Role } from '../../model/role';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-roles-nav',
  standalone: true,
  imports: [RolesListComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './roles-nav.component.html',
  styleUrl: './roles-nav.component.css'
})
export class RolesNavComponent {
  @Input({required: true}) roles!: Role[];
  @Input({required: true}) selectedRole!: Role;
  @Output() changeRole = new EventEmitter<string>();
  @Output() createNewRole = new EventEmitter<string>();

}
