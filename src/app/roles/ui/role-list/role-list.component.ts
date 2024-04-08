import { Component, Input, OnChanges, OnInit, SimpleChanges, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleListItemComponent } from '../role-list-item/role-list-item.component';
import { RouterLink } from '@angular/router';
import { RoleStateService } from '../../service/role.state.service';
import { RoleService } from '../../service/role.service';
import { LIST_STATE_VALUE } from '../../utils/list-state.type';


@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [CommonModule, RouterLink, RoleListItemComponent],
  templateUrl: './role-list.component.html',
})
export class RoleListComponent implements OnInit, OnChanges {
  @Input() selectedRoleId?: string;
  routerLinkPath: string = '';
  private roleService = inject(RoleService);

  listStateValue = LIST_STATE_VALUE;
  listState$ = this.roleService.listState$;

  ngOnInit() {
    this.getAllRoles();
  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }

  getAllRoles(): void {
    this.roleService.getAll();
  }

  createRole() {
    //TODO
  }

  updateRole(id: string) {
    //TODO
  }

  delateRole(id: string) {
    //TODO
  }

}
