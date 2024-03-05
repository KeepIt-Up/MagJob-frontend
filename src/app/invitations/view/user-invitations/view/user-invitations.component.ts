import { AcceptInvitationRequest } from './../../../model/AcceptInvitationRequest';
import { Invitation } from './../../../model/invitation';
import { UserService } from 'src/app/user/service/user.service';
import { Component, OnInit } from '@angular/core';
import { InvitationsService } from 'src/app/invitations/service/invitations.service';

@Component({
  selector: 'app-user-invitations',
  templateUrl: './user-invitations.component.html',
  styleUrls: ['./user-invitations.component.css']
})
export class UserInvitationsComponent implements OnInit {

  invitations: any[] = [];
  userId: number | null = null;

  constructor(
    private invitationService: InvitationsService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.loadInvitations();
  }

  loadInvitations() {
    this.userId = this.userService.getCurrentUserId();
    if (this.userId != null) {
      this.invitationService.getInvitations(this.userId).subscribe(
        (data) => {
          console.log(data);
          this.invitations = data.invitations;
        },
        (error) => {
          console.error('Błąd pobierania zaproszeń:', error);
        }
      );
    }
  }

  accept(invitation: any): void {
    const acceptInvitationRequest: AcceptInvitationRequest =
    {
      organization: invitation.organizationId,
      pseudonym: "changeme",
      user: invitation.userId
    };
    this.invitationService.accept(acceptInvitationRequest).subscribe(
      (response) => {
        console.log('Invitation accepted successfully:', response);
        this.invitations.splice(invitation,1);
      },
      (error) => {
        console.error('Error accepting invitation:', error);
      }
    );
  }

  reject(invitation: any): void {
    const rejectInvitationRequest: Invitation =
    {
      organization: invitation.organizationId,
      user: invitation.userId
    };
    this.invitationService.reject(rejectInvitationRequest).subscribe(
      (response) => {
        console.log('Invitation rejected successfully:', response);
        this.invitations.splice(invitation,1);
      },
      (error) => {
        console.error('Error rejecting invitation:', error);
      }
    );
  }
}
