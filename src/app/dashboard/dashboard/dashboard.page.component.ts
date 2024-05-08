import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserOrganizationComponent } from 'src/app/dashboard/ui/user-organization/user-organization.component';
import { UserInvitationsComponent } from '../../invitations/ui/user-invitations/user-invitations.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgIf, UserOrganizationComponent, UserInvitationsComponent, RouterLink],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  @Input() userId?: string;
}
