import { Component, inject } from '@angular/core';
import { UserFormComponent } from '../user-form/user-form.component';
import { CreateUserRequest } from '../../model/create-user-request';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-create-user-profile',
  standalone: true,
  imports: [UserFormComponent],
  templateUrl: './create-user-profile.component.html',
  styleUrls: ['./create-user-profile.component.css']
})
export class UpdateUserProfileComponent {

  private _userService = inject(UserService);

  createUser(user: CreateUserRequest)
  {
    this._userService.create(user).subscribe(
      (response) => {
        console.log('User created successfully:', response);
      },
      (error) => {
        console.error('User creation failed:', error);
      }
    );
  }
}
