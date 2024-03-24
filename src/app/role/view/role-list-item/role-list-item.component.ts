import { Component, Input } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Role } from '../../model/role';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-role-list-item',
  standalone: true,
  imports: [CommonModule, NgIf, RouterLink],
  templateUrl: './role-list-item.component.html',
  styleUrls: ['./role-list-item.component.css']
})
export class RoleListItemComponent {
  @Input({required: true}) role!: Role;

  showEditBtn: boolean = false;

  toggleEditButtonVisibility()
  {
    this.showEditBtn = !this.showEditBtn;
  }
}
