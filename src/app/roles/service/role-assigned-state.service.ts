import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Member } from 'src/app/organization/components/organization-members/model/member';

export type AssignedState = {
  assigned: Member[]
}

const initialState = {
  assigned: []
}

@Injectable({
  providedIn: 'root'
})
export class RoleAssignedStateService {

  constructor() { }

  private state$ = new BehaviorSubject<AssignedState>(initialState);

  value$ = this.state$.asObservable();

  addAssigned(assigned: Member)
  {
    this.state$.next({
      assigned: [...this.state$.value.assigned, assigned]
    });
  }

  setAssigned(assigned: Member[])
  {
    this.state$.next({
      assigned
    });
  }

  removeAssigned(assignedId: string)
  {
    const updatedAssigned = this.state$.value.assigned.filter((assigned) => {
      return assigned.id.toString() !== assignedId;
    });

    this.state$.next({
      assigned: updatedAssigned
    });
  }

}
