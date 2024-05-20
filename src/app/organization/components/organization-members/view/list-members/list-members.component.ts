import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { OrganizationService } from '../../../../service/organization.service';
import { Member } from 'src/app/organization/components/organization-members/model/member';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-list-members',
  standalone: true,
  imports: [RouterLink, NgFor],
  templateUrl: './list-members.component.html',
  styleUrls: ['./list-members.component.css'],
})
export class ListMembersComponent implements OnInit {
  @Input() organizationId?: string;
  members: Member[] = [];

  constructor(
    private organizationService: OrganizationService
  ) {}

  ngOnInit(): void {
    this.organizationService.getMembers(this.organizationId as string).subscribe({
      next: (data) => {
        this.members = data.members;
      },
      error: (error) => {
        console.error('Error fetching members:', error);
      }
    });
  }
}
