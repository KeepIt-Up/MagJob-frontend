import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { EMPTY, Observable, catchError, combineLatest, tap } from 'rxjs';
import { FetchingError } from 'src/app/utils/entity-state.type';

@Injectable({
  providedIn: 'root',
})
export class UserAPIService {
  private _http = inject(HttpClient);
  readonly apiEndpoint: string = '/api/users';
  readonly organizationEndpoint: string = '/api/organizations/users'; //check it
  readonly invitaionEndpoint: string = '/api/invitation'; //check it

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

  withLoadingState<T>(sources$: Observable<T>): Observable<T> {
    this.$idle.set(false);
    this.$error.set(null);
    this.$loading.set(true);

    return sources$.pipe(
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

  initUserData(userUid: string) {
    return this.withLoadingState(
      combineLatest([
        this._http.get<any>(`${this.organizationEndpoint}/${userUid}`, {
          observe: 'response',
        }),
        this._http.get<any>(this.invitaionEndpoint, {
          observe: 'response',
        }),
      ])
    );
  }

  getOrganizations() {
    return this.withLoadingState(
      this._http.get<any>(this.organizationEndpoint, {
        observe: 'response',
      })
    );
  }

  getInvitations() {
    return this.withLoadingState(
      this._http.get<any>(this.invitaionEndpoint, {
        observe: 'response',
      })
    );
  }
}
