import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { OrganizationService } from '../../../../service/organization.service';
import { Member } from 'src/app/organization/components/organization-members/model/member';
import { NgFor, CommonModule } from '@angular/common';
import { DeleteMembersComponent } from 'src/app/organization/components/organization-members/view/delete-members/delete-members.component';
import { EditMemberComponent } from "../edit-member/edit-member.component";
import { OrganizationMembersService } from '../../service/organization-members.service';
import {AuthStateService} from "../../../../../auth/service/auth.state.service";

@Component({
    selector: 'app-list-members',
    standalone: true,
    templateUrl: './list-members.component.html',
    styleUrls: ['./list-members.component.css'],
    imports: [CommonModule, RouterLinkActive, RouterLink, NgFor, DeleteMembersComponent, EditMemberComponent]

})
export class ListMembersComponent implements OnInit {
  organizationId?: number;
  members: Member[] = [];
  userID: string = '';
  permission: boolean = false;

  constructor(private route: ActivatedRoute, private organizationService: OrganizationService, private organizationMembersService: OrganizationMembersService, private authStateService: AuthStateService) {}

  ngOnInit(): void {
      this.organizationId = this.organizationService.getCurrentOrganizationId();
      this.checkPermission();
      if (this.organizationId) {
        this.loadMembers(this.organizationId);
      }
  }

  async checkPermission() {
    this.userID = this.authStateService.getUserID();
    this.permission = await this.authStateService.getUserPermissions('Role');
    if (this.permission) {
      console.log('User has permission for Role.');
    } else {
      console.log('User does not have permission for Role.');
    }
  }

  loadMembers(organizationId: number): void {

    this.organizationService.getMembers(String(organizationId)).subscribe({
      next:(data) => {
        this.members = data.members as Member[];
      },
      error: (error) => {
        console.error('Error fetching members:', error);
      }
  });
  }

  updateMember(payload: {id: number, pseudonym: string}) {
    this.organizationMembersService.update(payload.id, payload.pseudonym).subscribe(
      (response) => {
        console.log('Response:', response);
        this.loadMembers(this.organizationId!);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
