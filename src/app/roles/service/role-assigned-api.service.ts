import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { EMPTY, Observable, catchError, tap } from 'rxjs';
import { FetchingError } from '../utils/list-state.type';
import { Member } from 'src/app/organization/components/organization-members/model/member';

@Injectable({
  providedIn: 'root'
})
export class RoleAssignedApiService {
  private _http = inject(HttpClient);
  readonly apiEndpoint: string = 'http://localhost:3000/roles';

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

  getAllByRoleId(roleId:string) {
    return this.withLoadingState(
      this._http.get<Member[]>(`${this.apiEndpoint}/${roleId}/role-members`, {
        observe: 'response',
      })
    );
  }

  addToRole(payload: {roleId: string, memberId:string}) {
    return this.withLoadingState(
      this._http.post<Member>(`api/role-members`, payload)
    );
  }

  removeFromRole(assignedId: string) {
    return this.withLoadingState(
      this._http.delete<any>(`api/role-members/${assignedId}`)
    );
  }
}

