import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { InvitationsService } from 'src/app/invitations/service/invitations.service';
import { ComponentGetState } from '../../../dashboard/ui/user-organization/user-organization.component';
import { Invitation } from 'src/app/invitations/model/invitation';
import { NgFor, NgIf } from '@angular/common';
import { AcceptInvitationRequest } from 'src/app/invitations/model/accept-invitation-request';
import { RejectInvitationRequest } from 'src/app/invitations/model/reject-invitation-request';
import { InvitationCardComponent } from '../invitation-card/invitation-card.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-invitations',
  standalone: true,
  imports: [NgIf, NgFor, InvitationCardComponent],
  templateUrl: './user-invitations.component.html',
})
export class UserInvitationsComponent implements OnInit, OnDestroy {
  @Input({ required: true }) userId: string | undefined;
  userInvitationState: ComponentGetState<Invitation[]> = { state: 'idle' };
  invitationsSub!: Subscription;
  private invitationsService = inject(InvitationsService);

  ngOnInit(): void {
    this.userInvitationState = { state: 'loading' };

    this.invitationsSub = this.invitationsService.getInvitations(this.userId!).subscribe({
      next: (response) => {
        this.userInvitationState = {
          state: 'get-success',
          result: response.invitations,
        };
      },
      error: (err) => {
        this.userInvitationState = { state: 'error', error: err };
      },
    });
  }

  ngOnDestroy(): void {
    this.invitationsSub.unsubscribe();
  }

  accept(invitation: Invitation): void {
    const acceptInvitationRequest: AcceptInvitationRequest = {
      organization: invitation.organizationId,
      pseudonym: 'changeme',
      userId: invitation.userId,
    };
    this.invitationsService.accept(acceptInvitationRequest).subscribe({
      next: (response) => {
        if (this.userInvitationState.state == 'get-success') {
          this.userInvitationState.result = this.userInvitationState.result.filter(item => item.organizationName != invitation.organizationName );
        }
      },
      error: (error) => {
        console.error('Error accepting invitation:', error);
      },
    });
  }

  reject(invitation: Invitation): void {
    const rejectInvitationRequest: RejectInvitationRequest = {
      organization: invitation.organizationId,
      userId: invitation.userId
    };
    this.invitationsService.reject(rejectInvitationRequest).subscribe({
      next:(response) => {
        if (this.userInvitationState.state == 'get-success') {
          this.userInvitationState.result = this.userInvitationState.result.filter(item => item.organizationName != invitation.organizationName );
        }
      },
      error: (error) => {
        console.error('Error rejecting invitation:', error);
      }
    });
  }
}
