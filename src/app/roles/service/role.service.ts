import { Injectable, inject } from '@angular/core';
import { RoleApiService } from './role.api.service';
import { RoleStateService } from './role.state.service';
import {Observable, tap} from 'rxjs';
import { toObservable } from "@angular/core/rxjs-interop";
import {RoleUpdatePayload, RoleCreatePayload, RoleResponse, Role} from '../model/role';
import { createListState } from '../utils/create-list-state';
import {map} from "rxjs/operators";

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

  getRoleById(id: string): Observable<RoleResponse> {
    // @ts-ignore
    return this.httpService.getById(id).pipe(
      tap((response) => {
        if (response.body) {
          this.state.addRole(response.body);
        }
      }),
      map((response) => response.body)
    );
  }

  create(newRole: RoleCreatePayload) {
    return this.httpService.create(newRole).pipe(
      tap((response) => {
        if(response)
          {
            this.state.addRole(response);
          }
      })
    ).subscribe();
  }

  update(
    id: string,
    payload: RoleUpdatePayload
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

  getRolesByOrganization(organizationId: string, pageNumber: number = 0, pageSize: number = 10) {
    return this.httpService
      .getRolesByOrganization(organizationId, pageNumber, pageSize)
      .pipe(
        tap((response: any) => {
          if (response?.roles) {
            this.state.setRoles(response.roles);
          }
        })
      );
  }

}
