import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RoleListItemComponent } from '../role-list-item/role-list-item.component';
import { RoleService } from '../../service/role.service';
import { Role } from '../../model/role';

type RoleListError = { status: number; message: string };
type IdleState = { state: 'idle' };
type LoadingState = { state: 'loading' };
type SuccessState = { state: 'success'; result: Role[] };
type ErrorState = { state: 'error'; error: RoleListError };
type RoleListState = IdleState | LoadingState | SuccessState | ErrorState;

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [CommonModule, RoleListItemComponent, NgIf, NgFor],
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css'],
})
export class RoleListComponent implements OnInit {
  roleListState: RoleListState = { state: 'idle' };

  roles: Role[] = [
    {
      id: 1,
      name: "Admin",
      color: { r: 255, g: 0, b: 0 },
      permissions: [
        { id: 1, name: "Create" },
        { id: 2, name: "Read" },
        { id: 3, name: "Update" },
        { id: 4, name: "Delete" }
      ]
    },
    {
      id: 2,
      name: "Moderator",
      color: { r: 0, g: 255, b: 0 },
      permissions: [
        { id: 2, name: "Read" },
        { id: 3, name: "Update" }
      ]
    },
    {
      id: 3,
      name: "User",
      color: { r: 0, g: 0, b: 255 },
      permissions: [
        { id: 2, name: "Read" }
      ]
    },
    {
      id: 4,
      name: "Guest",
      color: { r: 128, g: 128, b: 128 },
      permissions: []
    },
    {
      id: 5,
      name: "Editor",
      color: { r: 255, g: 255, b: 0 },
      permissions: [
        { id: 2, name: "Read" },
        { id: 3, name: "Update" }
      ]
    },
    {
      id: 6,
      name: "Viewer",
      color: { r: 128, g: 0, b: 128 },
      permissions: [
        { id: 2, name: "Read" }
      ]
    },
    {
      id: 7,
      name: "Tester",
      color: { r: 0, g: 128, b: 128 },
      permissions: [
        { id: 6, name: "Test" }
      ]
    },
    {
      id: 8,
      name: "Analyst",
      color: { r: 255, g: 165, b: 0 },
      permissions: [
        { id: 2, name: "Read" },
        { id: 5, name: "Analyze" }
      ]
    },
    {
      id: 9,
      name: "Developer",
      color: { r: 0, g: 255, b: 255 },
      permissions: [
        { id: 1, name: "Create" },
        { id: 3, name: "Update" }
      ]
    },
    {
      id: 10,
      name: "Supervisor",
      color: { r: 255, g: 20, b: 147 },
      permissions: [
        { id: 2, name: "Read" },
        { id: 7, name: "Supervise" }
      ]
    }
  ];

  private _roleService = inject(RoleService);

  ngOnInit() {
    this.roleListState ={state: 'loading'};

    // this._roleService.getAll().subscribe({
    //   next: (response) => {
    //     this.roleListState = { state: 'success', result: response };
    //   },
    //   error: (err) => {
    //     this.roleListState = { state: 'error', error: err };
    //   },
    // });

    this.roleListState = {state: 'success', result: this.roles}
  }

  showEditBtn: boolean = false;

  toggleEditButtonVisibility()
  {
    this.showEditBtn = !this.showEditBtn;
  }
}
