import { Injectable, inject } from '@angular/core';
import { MemberRoleApiService } from './member-role.api.service';
import { MemberRoleStateService } from './member-role.state.service';
import { Observable, tap } from 'rxjs';
import { toObservable } from "@angular/core/rxjs-interop";
import { MemberRole, MemberRoleCreatePayload, MemberRoleCreateManyPayload } from '../model/member-role';
import { createListState } from '../utils/create-list-state';
import { map } from 'rxjs/operators';

type FetchingError = { message: string, status: number };

export type LoadingState = {
  idle: boolean;
  loading: boolean;
  error: FetchingError | null;
};

@Injectable({
  providedIn: 'root',
})
export class MemberRoleService {
  private httpService = inject(MemberRoleApiService);
  private state = inject(MemberRoleStateService);

  private loadingState$ = toObservable(this.httpService.$loadingState);

  listState$ = createListState(
    this.state.value$,
    this.loadingState$,
    (state) => state.memberRoles,
  );

  // Get all role members
  getAll(): Observable<MemberRole[]> {
    return this.httpService.getAll().pipe(
      tap((response) => {
        if (response.body) {
          this.state.setRoleMembers(response.body);
        }
      }),
      map((response) => response.body)
    );
  }

  // Get a role member by ID
  getMemberRoleById(id: string): Observable<MemberRole> {
    // @ts-ignore
    return this.httpService.getMemberRoleById(id).pipe(
      tap((response) => {
        if (response.body) {
          this.state.addRoleMember(response.body);
        }
      }),
      map((response) => response.body)
    );
  }

  // Get role members by role ID
  getRoleMembersByRoleId(roleId: string): Observable<MemberRole[]> {
    return this.httpService.getAllFromRole(roleId).pipe(
      tap((response) => {
        if (response.body) {
          this.state.setRoleMembers(response.body);
        }
      }),
      map((response) => response.body)
    );
  }

  // Get role members by member ID
  getRoleMembersByMemberId(memberId: string): Observable<MemberRole[]> {
    return this.httpService.getAllFromMember(memberId).pipe(
      tap((response) => {
        if (response.body) {
          this.state.setRoleMembers(response.body);
        }
      }),
      map((response) => response.body)
    );
  }

  // Create a new role member
  create(payload: MemberRoleCreatePayload) {
    return this.httpService.create(payload).pipe(
      tap((response) => {
        if (response) {
          this.state.addRoleMember(response);
        }
      })
    ).subscribe();
  }

  // Create many role members
  createMany(payload: MemberRoleCreateManyPayload) {
    return this.httpService.createMany(payload).pipe(
      tap((response) => {
        if (response) {
          this.state.setRoleMembers(response);
        }
      })
    ).subscribe();
  }

  // Delete a role member by member ID and role ID
  delete(memberId: string, roleId: string) {
    return this.httpService.delete(memberId, roleId).pipe(
      tap(() => {
        this.state.removeRole(memberId, roleId);
      })
    ).subscribe();
  }
}
