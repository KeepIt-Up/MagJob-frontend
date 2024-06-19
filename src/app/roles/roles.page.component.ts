import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RoleListComponent } from './ui/role-list/role-list.component';

export enum RoleSection {
  apperiance = 1,
  permissions = 2,
  membersManagment = 3,
}

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RoleListComponent],
  template: `
  <div class="container d-flex mb-5">
      <app-role-list ></app-role-list>
  </div>`
})
export class RolesComponent {

}
