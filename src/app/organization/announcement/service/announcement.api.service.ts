import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { EMPTY, Observable, catchError, tap } from 'rxjs';
import { FetchingError } from '../utils/list-state.type';
import { Announcement } from '../model/announcement';
import { AnnouncementCreatePayload } from '../model/announcement-create-payload';
import { AnnouncementUpdatePayload } from '../model/announcement-update-payload';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementApiService {
  private _http = inject(HttpClient);
  readonly apiEndpoint: string = 'api/announcements';

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

  getById(id: string) {
    return this.withLoadingState(
      this._http.get<Announcement>(`${this.apiEndpoint}/${id}`, {
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
  getAllByOrganizationId(id: string)
  {
    return this.withLoadingState(
      this._http.get<any>(`api/organizations/${id}/announcements`, {
        observe: 'response',
      })
    );
  }

  create(payload: AnnouncementCreatePayload) {
    return this.withLoadingState(
      this._http.post<Announcement>(`${this.apiEndpoint}`, payload)
    )
  }

  update(id: string, payload: AnnouncementUpdatePayload) {
    console.log("tu");
    return this.withLoadingState(
      this._http.patch<Announcement>(`${this.apiEndpoint}/${id}`, payload)
    );
  }

  delete(id: string) {
    return this.withLoadingState(
      this._http.delete<any>(`${this.apiEndpoint}/${id}`)
    );
  }
}
