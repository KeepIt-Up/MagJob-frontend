import { Injectable, inject } from '@angular/core';
import { RoleApiService } from './role.api.service';
import { RoleStateService } from './role.state.service';
import { tap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { SectionTypeValue } from '../../roles.component';
import { createListState } from 'src/app/roles/utils/create-list-state';
import { UpdateRolePayload } from '../../model/role';
import { OAuthService } from 'angular-oauth2-oidc';

type FetchingError = { message: string; status: number };

export type LoadingState = {
  idle: boolean;
  loading: boolean;
  error: FetchingError | null;
};

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private httpService = inject(RoleApiService);
  private state = inject(RoleStateService);
  private oauthService = inject(OAuthService);

  private loadingState$ = toObservable(this.httpService.$loadingState);

  listState$ = createListState(
    this.state.value$,
    this.loadingState$,
    (state) => state.roles
  );

  state$ = this.state.value$;

  getAll() {
    this.httpService
      .getAll()
      .pipe(
        tap((response) => {
          if (response.body) {
            this.state.setRoles(response.body.roles);
          }
        })
      )
      .subscribe();
  }

  getAllByOrganization(organizationId: string) {
    this.httpService
      .getAllByOrganization(organizationId)
      .pipe(
        tap((response) => {
          if (response.body) {
            this.state.setRoles(response.body.roles);
          }
        })
      )
      .subscribe();
  }

  getById(id: string) {
    this.httpService
      .getById(id)
      .pipe(
        tap((response) => {
          if (response.body) {
            this.state.addRole(response.body);
          }
        })
      )
      .subscribe();
  }


  /**
   * Create role of given name in given organization
   * With all permissions set to false
   */
  create(organizationId: string, roleName: string) {
    const payload = {
      name: roleName,
      organization: organizationId,
      canManageTasks: false,
      canManageAnnouncements: false,
      canManageInvitations: false,
      canManageRoles: false,
    };

    return this.httpService
      .create(payload)
      .pipe(
        tap((response) => {
          if (response) {
            this.state.addRole(response);
          }
        })
      )
      .subscribe();
  }


  /**
   * Update role of given id
   * @param id Role Id
   * @param payload 
   * @returns 
   */
  update(id: string, payload: UpdateRolePayload) {
    return this.httpService
      .update(id, payload)
      .pipe(
        tap((role) => {
          this.state.updateRole(role);
          this.oauthService.silentRefresh();
        })
      )
      .subscribe();
  }

  /**
   * Delete role of given Id
   * @param id 
   * @returns 
   */
  delete(id: string) {
    return this.httpService
      .delete(id)
      .pipe(
        tap(() => {
          this.state.removeRole(id);
        })
      )
      .subscribe();
  }

  changeSection(sectionType: SectionTypeValue) {
    this.state.changeSection(sectionType);
  }

  changeSelectedRole(roleId: string) {
    this.state.setSelectedRole(roleId);
  }
}
