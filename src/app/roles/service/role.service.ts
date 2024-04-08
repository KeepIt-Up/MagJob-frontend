import { Injectable, inject } from '@angular/core';
import { RoleApiService } from './role.api.service';
import { RoleStateService } from './role.state.service';
import { tap } from 'rxjs';
import { toObservable } from "@angular/core/rxjs-interop";
import { RoleUpdatePayload } from '../model/role-update-payload';
import { RoleCreatePayload } from '../model/role-create-payload';
import { createListState } from '../utils/create-list-state';

type FetchingError = { message: string, status: number };

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

  private loadingState$ = toObservable(this.httpService.$loadingState);

  listState$ = createListState(
    this.state.value$,
    this.loadingState$,
    (state) => state.roles,
  );

  getAll() {
    this.httpService
      .getAll()
      .pipe(
        tap((response) => {
          if (response.body) {
            this.state.setRoles(response.body);
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

  create(newRole: RoleCreatePayload) {
    return this.httpService.create(newRole).pipe(
      tap((role) => {
        this.state.addRole(role);
      })
    );
  }

  update(
    id: string,
    payload: RoleUpdatePayload //change type of payload
  ) {
    return this.httpService.update(id, payload).pipe(
      tap((role) => {
        this.state.updateRole(role);
      })
    );
  }

  delete(id: string) {
    return this.httpService.delete(id).pipe(
      tap(() => {
        this.state.removeRole(id);
      })
    );
  }
}
