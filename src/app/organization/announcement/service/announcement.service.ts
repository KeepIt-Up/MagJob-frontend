import { Injectable, inject } from '@angular/core';
import { AnnouncementApiService } from './announcement.api.service';
import { tap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { createListState } from '../utils/create-list-state';
import { AnnouncementStateService } from './announcement.state.service';
import { AnnouncementCreatePayload, AnnouncementUpdatePayload } from '../model/announcement';

type FetchingError = { message: string; status: number };

export type LoadingState = {
  idle: boolean;
  loading: boolean;
  error: FetchingError | null;
};

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  private httpService = inject(AnnouncementApiService);
  private state = inject(AnnouncementStateService);

  private loadingState$ = toObservable(this.httpService.$loadingState);

  listState$ = createListState(
    this.state.value$,
    this.loadingState$,
    (state) => state.announcements
  );

  getAll() {
    this.httpService
      .getAll()
      .pipe(
        tap((response) => {
          if (response.body) {
            this.state.setAnnouncements(response.body.announcements);
          }
        })
      )
      .subscribe();
  }

  getAllByOrganizationId(id: string)
  {
    this.httpService
      .getAllByOrganizationId(id)
      .pipe(
        tap((response) => {
          if (response.body) {
            this.state.setAnnouncements(response.body.announcements);
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
            this.state.addAnnouncement(response.body);
          }
        })
      )
      .subscribe();
  }

  create(payload: AnnouncementCreatePayload) {
    return this.httpService
      .create(payload)
      .pipe(
        tap((response) => {
          if (response) {
            this.state.addAnnouncement(response);
          }
        })
      )
      .subscribe();
  }

  update(id: string, payload: AnnouncementUpdatePayload) {
    return this.httpService.update(id, payload).pipe(
      tap((response) => {
        this.state.updateAnnouncement(response);
      })
    ).subscribe();
  }

  delete(id: string) {
    return this.httpService.delete(id).pipe(
      tap(() => {
        this.state.removeAnnouncement(id);
      })
    ).subscribe();
  }
}
