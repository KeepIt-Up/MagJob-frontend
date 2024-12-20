import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Role, RoleUpdatePayload, RoleCreatePayload } from '../model/role';
import { FetchingError } from '../utils/list-state.type';
import { EMPTY, Observable, catchError, tap } from 'rxjs';

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
  getAll() {
    return this.withLoadingState(
      this._http.get<any>(this.apiEndpoint, {
        observe: 'response',
      })
    );
  }

  create(payload: RoleCreatePayload) {
    return this.withLoadingState(
      this._http.post<Role>(`${this.apiEndpoint}`, payload)
    )
  }

  update(roleId: string, payload: RoleUpdatePayload) {
    return this.withLoadingState(
      this._http.put<Role>(`${this.apiEndpoint}/${roleId}`, payload)
    );
  }

  delete(roleId: string) {
    return this.withLoadingState(
      this._http.delete<any>(`${this.apiEndpoint}/${roleId}`)
    );
  }

  getRolesByOrganization(organizationId: string, pageNumber: number = 0, pageSize: number = 10): Observable<any> {
    return this.withLoadingState(
      this._http.get<any>(
        `api/organizations/${organizationId}/roles`,
        {
          params: {
            'page-number': pageNumber.toString(),
            'page-size': pageSize.toString()
          }
        }
      )
    );
  }

}
