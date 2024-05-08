import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { OrganizationService } from '../../../../service/organization.service';
import { Member } from 'src/app/organization/components/organization-members/model/member';
import { NgFor } from '@angular/common';
import { DeleteMembersComponent } from 'src/app/organization/components/organization-members/view/delete-members/delete-members.component';
import { EditMemberComponent } from "../edit-member/edit-member.component";

@Component({
    selector: 'app-list-members',
    standalone: true,
    templateUrl: './list-members.component.html',
    styleUrls: ['./list-members.component.css'],
    imports: [RouterLinkActive, RouterLink, NgFor, DeleteMembersComponent, EditMemberComponent]
})
export class ListMembersComponent implements OnInit {
  members: Member[] = [];
  organizationId: number | null = null;

  constructor(private route: ActivatedRoute, private organizationService: OrganizationService) {}

  ngOnInit(): void {
      this.organizationId = this.organizationService.getCurrentOrganizationId();
      if (this.organizationId) {
        this.loadMembers(this.organizationId);
      }
  }

  loadMembers(organizationId: number): void {
    
    this.organizationService.getMembers(organizationId).subscribe(
      (data) => {
        this.members = data.members as Member[];
      },
      (error) => {
        console.error('Error fetching members:', error);
      }
    );
  }
}
