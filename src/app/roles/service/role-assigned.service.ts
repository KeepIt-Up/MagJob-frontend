import { Injectable, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { createListState } from '../utils/create-list-state';
import { RoleAssignedApiService } from './role-assigned-api.service';
import { RoleAssignedStateService } from './role-assigned-state.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleAssignedService {
  private httpService = inject(RoleAssignedApiService);
  private state = inject(RoleAssignedStateService);

  private loadingState$ = toObservable(this.httpService.$loadingState);

  listState$ = createListState(
    this.state.value$,
    this.loadingState$,
    (state) => state.assigned,
  );

  getAllByRoleId(roleId: string) {
    this.httpService
      .getAllByRoleId(roleId)
      .pipe(
        tap((response) => {
          if (response.body) {
            this.state.setAssigned(response.body);
          }
        })
      )
      .subscribe();
  }

  add(assigned: {roleId: string, memberId:string}) {
    return this.httpService.addToRole(assigned).pipe(
      tap((role) => {
        this.state.addAssigned(role);
      })
    );
  }


  remove(id: string) {
    return this.httpService.removeFromRole(id).pipe(
      tap(() => {
        this.state.removeAssigned(id);
      })
    );
  }
}

