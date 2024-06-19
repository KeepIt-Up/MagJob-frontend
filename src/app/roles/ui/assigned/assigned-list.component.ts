import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberCardComponent } from '../member-card/member-card.component';
import { SearchComponent } from 'src/app/roles/shared/search-input.component';
import { RoleAssignedService } from 'src/app/roles/service/role-assigned.service';
import { LIST_STATE_VALUE } from 'src/app/roles/utils/list-state.type';

@Component({
  selector: 'app-assigned-list',
  standalone: true,
  imports: [CommonModule, MemberCardComponent, SearchComponent],
  templateUrl: './assigned-list.component.html'
})
export class AssignedListComponent implements OnInit {
  @Input({required: true}) roleId!: string;

  assignedService = inject(RoleAssignedService);

  listStateValue = LIST_STATE_VALUE;
  listState$ = this.assignedService.listState$;

  ngOnInit(): void {
    this.assignedService.getAllByRoleId(this.roleId);
  }

  removeMember(assignedId: string)
  {
    this.assignedService.remove(assignedId);
  }

  filterMembers(searchText: string)
  {
    //TODO
  }

  addMember(roleId: string, memberId: string)
  {
    this.assignedService.add({roleId: roleId, memberId: memberId });
  }
}
