import { Component, computed, inject } from '@angular/core';
import { RoleDetailsStateService } from '../config/role-details.state';
import { EditRolePage, ROLE_PAGE } from '../shared/enums/edit-role-page.enum';

@Component({
  selector: 'app-role-details-nav',
  standalone: true,
  imports: [],
  template: `
    <div class="d-flex justify-content-center mb-3">
      <a role="button"
        class="link-offset-3 link-offset-3-hover link-underline-opacity-75-hover mx-2 link-secondary link-underline-opacity-0"
        [class]="$rolePage() === editRolePageValue.APPERIANCE_PAGE ? 'link-warning link-underline-opacity-100' : ''"
        (click)="changePage(editRolePageValue.APPERIANCE_PAGE)"
        >Apperiance</a
      >
      <a role="button"
        class="link-offset-3 link-offset-3-hover link-underline-opacity-75-hover mx-2 link-secondary link-underline-opacity-0"
        [class]="$rolePage() === editRolePageValue.PERMISSION_PAGE ? 'link-warning link-underline-opacity-100' : ''"
        (click)="changePage(editRolePageValue.PERMISSION_PAGE)"
        >Permissions</a
      >
      <a role="button"
        class="link-offset-3 link-offset-3-hover link-underline-opacity-75-hover mx-2 link-secondary link-underline-opacity-0"
        [class]="$rolePage() === editRolePageValue.ASSIGN_PAGE ? 'link-warning link-underline-opacity-100' : ''"
        (click)="changePage(editRolePageValue.ASSIGN_PAGE)"
        >Members managment</a
      >
    </div>
  `,
})
export class RoleDetailsNavComponent {
  stateService = inject(RoleDetailsStateService);
  editRolePageValue = ROLE_PAGE;
  $rolePage = computed(() => this.stateService.$value().editRolePage);

  changePage(rolePage: EditRolePage)
  {
    this.stateService.updateRolePage(rolePage);
  }
}
