import { Invitation } from './../../../../../invitations/model/invitation';
import { OrganizationService } from 'src/app/organization/service/organization.service';
import { InvitationsService } from 'src/app/invitations/service/invitations.service';
import { Component, Input, OnInit, inject } from '@angular/core';
import { User } from 'src/app/user/model/user';
import { UserService } from 'src/app/user/service/user.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SendInvitationRequest } from 'src/app/invitations/model/send-invitation-request';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

type SearchForm = FormGroup<{
  text: FormControl<string>;
}>

@Component({
  selector: 'app-add-members',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, AsyncPipe],
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.css']
})
export class AddMembersComponent implements OnInit{
  @Input() organizationId?: string;

  users$ = new BehaviorSubject<User[]>([]);
  filteredUsers$ = new BehaviorSubject<User[]>([]);

  constructor(private userService: UserService, private invitationsService: InvitationsService, private organizationService: OrganizationService)  {}

  private _formBuilder = inject(NonNullableFormBuilder);

  searchForm: SearchForm = this._formBuilder.group({
    text: this._formBuilder.control<string>('')
  })

  ngOnInit(): void {
    this.searchUsers();
  }


  searchUsers() {
    this.userService.getUsers().subscribe({next: (data) => {
      this.users$.next(data.users);
      this.filterUsers();
    }});
  }

  filterUsers() {
      const searchFormValue = this.searchForm.getRawValue().text;
      this.filteredUsers$.next(this.users$.getValue().filter((user: User) => 
        user.firstName?.toLowerCase().includes(searchFormValue.toLowerCase()) || user.lastName?.toLowerCase().includes(searchFormValue.toLowerCase())
    ));
  }

  inviteUser(user: User) {
    console.log(this.organizationId)
    const invitation: SendInvitationRequest = {
      userId: user.id,
      organization: Number(this.organizationId as string),
    }
    this.invitationsService.invite(invitation).subscribe({
      next: (response) => {
        console.log('Response:', response);
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }
}
