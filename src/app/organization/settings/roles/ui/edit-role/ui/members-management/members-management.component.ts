import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Member } from '../../../../model/role';

@Component({
  selector: 'app-members-management',
  standalone: true,
  imports: [],
  templateUrl: './members-management.component.html',
  styleUrl: './members-management.component.css'
})
export class MembersManagementComponent {
  @Input({required: true}) members!: Member[];
  @Output() unassignMember = new EventEmitter<string>();
}
