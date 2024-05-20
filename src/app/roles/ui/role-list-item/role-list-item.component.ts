import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Role } from '../../model/role';
import { RouterLink } from '@angular/router';
import { RoleStateService } from '../../service/role.state.service';

@Component({
  selector: 'app-role-list-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <div class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
    <div class="d-flex align-items-center">
        <div class="m-2">
            <i class="bi bi-people-fill"></i>
        </div>
        <div class="m-2">
            <h6>{{role.name}}</h6>
        </div>
    </div>

    <div class="d-flex justify-content-between align-items-center ms-5">
        <a class="btn btn-sm btn-outline-secondary m-1 rounded-circle" [routerLink]="[role.id]"><i
            class="bi bi-pencil-fill"></i></a>
        <a *ngIf="canDelete" class="btn btn-sm btn-outline-danger m-1 rounded-circle" (click)="delete.emit(role.id.toString())"><i
                class="bi bi-trash3"></i></a>
    </div>
</div>`
})
export class RoleListItemComponent {
  @Input({required: true}) role!: Role;
  @Input({required: true}) routerLinkPath!: string;
  @Input() canDelete: boolean = false;
  @Output() delete = new EventEmitter<string>();
}
