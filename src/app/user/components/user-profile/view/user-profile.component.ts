import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { UserInvitationsComponent } from 'src/app/invitations/view/user-invitations/view/user-invitations.component';
import { NgIf } from '@angular/common';
import { UserFormComponent } from '../../user-form/user-form.component';
import { User } from 'src/app/user/model/user';
import { UpdateUserRequest } from 'src/app/user/model/update-user-request';

type GetError = { status: number; message: string };

type IdleState = { state: 'idle' };
type LoadingState = { state: 'loading' };
type GetSuccessState = { state: 'get-success'; result: User };
type UpdateSuccessState = { state: 'update-success'; result: User };
type ErrorState = { state: 'error'; error: GetError };

export type ComponentState =
  | IdleState
  | LoadingState
  | GetSuccessState
  | UpdateSuccessState
  | ErrorState;

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [UserInvitationsComponent, NgIf, UserFormComponent],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  componentState: ComponentState = { state: 'idle' };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this.componentState = { state: 'loading' };

    const userId = this.getUserIdFromRoute();
    this._userService.get(userId).subscribe({
      next: (response) => {
        this.componentState = { state: 'get-success', result: response };
      },
      error: (err) => {
        this.componentState = { state: 'error', error: err };
      },
      complete: () => console.log(),
    });
  }

  viewSettings(): void {
    const userId = this.getUserIdFromRoute();
    this.router.navigate([`/user/${userId}/settings`]);
  }

  updateUser(user: UpdateUserRequest) {
    this._userService.update(this.getUserIdFromRoute(), user).subscribe({
      next: (response) => {
        this.componentState = { state: 'update-success', result: response };
      },
      error: (err) => {
        this.componentState = { state: 'error', error: err };
      },
    });
  }

  getUserIdFromRoute(): number {
    let userId = -1;
    this.route.params.subscribe({
      next: (params) => {
        userId = params['id'];
      },
      error: (err) => {
        console.log(err);
      },
    });
    return userId;
  }
}
