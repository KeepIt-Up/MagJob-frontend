import { Invitation } from './../../../../../invitations/model/invitation';
import { OrganizationService } from 'src/app/organization/service/organization.service';
import { InvitationsService } from 'src/app/invitations/service/invitations.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user/model/user';
import { UserService } from 'src/app/user/service/user.service';

@Component({
  selector: 'app-add-members',
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.css']
})
export class AddMembersComponent implements OnInit{
  users: User[] = [];
  filteredUsers: User[] = [];
  searchText: string = '';

  constructor(private userService: UserService, private invitationsService: InvitationsService, private organizationService: OrganizationService)  {}

  ngOnInit(): void {
    this.searchUsers();
  }


  searchUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data.users;
      console.log(this.users);
      this.filterUsers();
    });
  }

  filterUsers() {
    this.filteredUsers = this.users.filter((user) =>
      user.email.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  inviteUser(user: any) {
    const invitation: Invitation = {
      user: user.id,
      organization: this.organizationService.getCurrentOrganizationId(),
    }
    this.invitationsService.invite(invitation).subscribe(
      (response) => {
        console.log('Response:', response);
        this.users.splice(user, 1);
        this.filteredUsers.splice(user, 1);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
