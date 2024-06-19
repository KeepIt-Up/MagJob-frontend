import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { EMPTY, Observable, catchError, tap } from 'rxjs';
import { Role, UpdateRolePayload } from '../../model/role';
import { FetchingError } from 'src/app/utils/entity-state.type';

@Injectable({
  providedIn: 'root',
})
export class RoleApiService {
  private _http = inject(HttpClient);
  readonly apiEndpoint: string = 'api/roles';

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

  getById(roleId: string) {
    return this.withLoadingState(
      this._http.get<Role>(`${this.apiEndpoint}/${roleId}`, {
        observe: 'response',
      })
    );
  }

  /**
   * Get all roles of given organization
   * @param organizationId 
   * @returns Observable with HttpResponse
   */
  getAllByOrganization(organizationId: string) {
    return this.withLoadingState(
      this._http.get<any>(`api/organizations/${organizationId}/roles`, {
        observe: 'response',
      })
    );
  }

  create(payload: any) {
    return this.withLoadingState(
      this._http.post<Role>(`${this.apiEndpoint}`, payload)
    )
  }

  update(roleId: string, payload: UpdateRolePayload) {
    return this.withLoadingState(
      this._http.patch<Role>(`${this.apiEndpoint}/${roleId}`, payload)
    );
  }

  delete(roleId: string) {
    return this.withLoadingState(
      this._http.delete<any>(`${this.apiEndpoint}/${roleId}`)
    );
  }

  assignMembers(payload: any)
  {
    return this._http.post(`/api/role-members/list`, payload, {observe: 'response'});
  }

  unassignMember(memberId: string, roleId: string)
  {
    //TO VERIFY
    return this._http.delete(`/api/role-members/${memberId}/${roleId}`, {observe: 'response'});
  }
}
