import { Component, Input } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Permission } from '../model/permission';

@Component({
  selector: 'app-permissions-list',
  standalone: true,
  imports: [CommonModule, NgFor],
  template:` <div *ngFor="let permission of permissions">
              <a>{{permission.name}}</a>
            </div>`,
})
export class PermissionsListComponent {
  @Input() permissions!: Permission[];
}
