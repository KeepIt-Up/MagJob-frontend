import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { FetchingError } from '../utils/list-state.type';
import { EMPTY, Observable, catchError, tap } from 'rxjs';
import {MemberRole, MemberRoleCreateManyPayload, MemberRoleCreatePayload} from "../model/member-role";

@Injectable({
  providedIn: 'root',
})
export class MemberRoleApiService {
  private _http = inject(HttpClient);
  readonly roleMembersEndpoint: string = '/api/role-members';
  readonly rolesEndpoint: string = 'api/roles';
  readonly membersEndpoint: string = 'api/members';

  private $idle = signal(true);
  private $loading = signal(false);
  private $error = signal<FetchingError | null>(null);

  $loadingState = computed(() => {
    return {
      idle: this.$idle(),
      loading: this.$loading(),
      error: this.$error(),
    };
  });

  withLoadingState<T>(source$: Observable<T>): Observable<T> {
    this.$idle.set(false);
    this.$error.set(null);
    this.$loading.set(true);

    return source$.pipe(
      catchError((e: HttpErrorResponse) => {
        this.$error.set({ message: e.message, status: e.status });
        this.$loading.set(false);

        return EMPTY;
      }),
      tap(() => {
        this.$loading.set(false);
      })
    );
  }

  getMemberRoleById(Id: string) {
    return this.withLoadingState(
      this._http.get<MemberRole>(`${this.roleMembersEndpoint}/${Id}`, {
        observe: 'response',
      })
    );
  }

  getAll() {
    return this.withLoadingState(
      this._http.get<any>(this.roleMembersEndpoint, {
        observe: 'response',
      })
    );
  }

  getAllFromRole(roleId: string) {
    return this.withLoadingState(
      this._http.get<any>(`${this.rolesEndpoint}/${roleId}/role-members`, {
        observe: 'response',
      })
    );
  }

  getAllFromMember(memberId: string) {
    return this.withLoadingState(
      this._http.get<any>(`${this.membersEndpoint}/${memberId}/role-members`, {
        observe: 'response',
      })
    );
  }

  create(payload: MemberRoleCreatePayload) {
    return this.withLoadingState(
      this._http.post<MemberRole>(`${this.roleMembersEndpoint}`, payload)
    )
  }

  createMany(payload: MemberRoleCreateManyPayload) {
    return this.withLoadingState(
      this._http.post<MemberRole[]>(`${this.roleMembersEndpoint}/list`, payload)
    )
  }

  delete(memberId: string, roleId: string) {
    return this.withLoadingState(
      this._http.delete<any>(`${this.roleMembersEndpoint}/${memberId}/${roleId}`)
    );
  }
}
