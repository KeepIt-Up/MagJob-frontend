import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  computed,
  inject,
} from '@angular/core';
import { RoleDetailsNavComponent } from './ui/role-details-nav.component';
import { RoleService } from './service/role.service';
import { LIST_STATE_VALUE } from './utils/list-state.type';
import { ROLE_PAGE } from './shared/enums/edit-role-page.enum';
import { ApperianceComponent } from './ui/apperiance/apperiance.component';
import { PermissionsComponent } from './ui/permissions/permissions.component';
import { Role } from './model/role';
import { RoleDetailsStateService } from './config/role-details.state';
import { Subscription } from 'rxjs';
import { AssignedListComponent } from './ui/assigned/assigned-list.component';

@Component({
  selector: 'app-role-details',
  standalone: true,
  imports: [
    CommonModule,
    RoleDetailsNavComponent,
    ApperianceComponent,
    PermissionsComponent,
    AssignedListComponent,
  ],
  template: `
    <app-role-details-nav></app-role-details-nav>

    <div *ngIf="state$ | async as state">
      <div *ngIf="state.state == listStateValue.SUCCESS && role && roleId">
        <div [ngSwitch]="$rolePage()">
          <div *ngSwitchCase="editRolePageValue.APPERIANCE_PAGE">
            <app-apperiance [role]="role"></app-apperiance>
          </div>
          <div *ngSwitchCase="editRolePageValue.PERMISSION_PAGE">
            <app-permissions-list
              [role]="role"
            ></app-permissions-list>
          </div>
          <div *ngSwitchCase="editRolePageValue.ASSIGN_PAGE">
            <app-assigned-list [roleId]="roleId"></app-assigned-list>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class RoleDetailsComponent implements OnInit, OnDestroy {
  @Input() roleId?: string;
  role?: Role;
  roleSubscription!: Subscription;
  editRolePageValue = ROLE_PAGE;
  roleService = inject(RoleService);
  stateService = inject(RoleDetailsStateService);

  $rolePage = computed(() => this.stateService.$value().editRolePage);

  listStateValue = LIST_STATE_VALUE;
  state$ = this.roleService.listState$;

  ngOnInit(): void {
    if (this.roleId) {
      this.roleService.getById(this.roleId);
    }
    this.roleSubscription = this.state$.subscribe({
      next: (state2) => {
        console.log(state2)
        if (state2.state == LIST_STATE_VALUE.SUCCESS) {
          this.role = state2.results.find((role) => role.id.toString() === this.roleId);
        }
        else
        {
          console.log(this.role)
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.roleSubscription.unsubscribe();
  }
}
