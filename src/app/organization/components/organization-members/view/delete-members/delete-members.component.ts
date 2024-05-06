import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrganizationMembersService } from '../../service/organization-members.service';
import { Member } from '../../model/member';

@Component({
  selector: 'app-delete-members',
  standalone: true,
  templateUrl: './delete-members.component.html',
  styleUrls: ['./delete-members.component.css']
})
export class DeleteMembersComponent {
  @Input({ required: true }) member!: Member;
  
  @Output() requestListRefreshEvent = new EventEmitter<void>();

  constructor( private organizationMembersService: OrganizationMembersService ) {}

  deleteMember() {
    this.organizationMembersService.delete(this.member.id);
    this.requestListRefreshEvent.emit();
  }
}
