import { Invitation } from './../../../../../invitations/model/invitation';
import { OrganizationService } from 'src/app/organization/service/organization.service';
import { InvitationsService } from 'src/app/invitations/service/invitations.service';
import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/app/user/model/user';
import { UserService } from 'src/app/user/service/user.service';
import { NgFor } from '@angular/common';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';

type SearchForm = FormGroup<{
  text: FormControl<string>;
}>

@Component({
  selector: 'app-add-members',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule],
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.css']
})
export class AddMembersComponent implements OnInit{
  users: User[] = [];
  filteredUsers: User[] = [];

  constructor(private userService: UserService, private invitationsService: InvitationsService, private organizationService: OrganizationService)  {}

  private _formBuilder = inject(NonNullableFormBuilder);

  searchForm: SearchForm = this._formBuilder.group({
    text: this._formBuilder.control<string>('')
  })

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
      const searchText: string = this.searchForm.get('text')?.value as string;
      this.filteredUsers = this.users.filter((user: User) => 
        user.email.toLowerCase().includes(searchText.toLowerCase())
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
