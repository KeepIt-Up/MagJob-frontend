import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import {
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
  NonNullableFormBuilder,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { User } from '../../model/user';

type UserForm = FormGroup<{
  email: FormControl<string>;
  firstname: FormControl<string>;
  lastname: FormControl<string>;
  phoneNumber: FormControl<string>;
  birthDate: FormControl<Date>;
}>;

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent {
  @Input() user!: User;
  @Output() submitUser = new EventEmitter<User>();

  private _formBuilder = inject(NonNullableFormBuilder);

  userForm: UserForm = this._formBuilder.group({
    email: this._formBuilder.control<string>(
      this.user?.email ? this.user.email : '',
      [Validators.email, Validators.required]
    ),
    firstname: this._formBuilder.control<string>(
      this.user?.firstname ? this.user.firstname : '',
      [Validators.pattern('^[a-zA-Z0-9]*$'), Validators.required]
    ),
    lastname: this._formBuilder.control<string>(
      this.user?.lastname ? this.user.lastname : '',
      [Validators.pattern('^[a-zA-Z0-9]*$'), Validators.required]
    ),
    phoneNumber: this._formBuilder.control<string>(
      this.user?.phoneNumber ? this.user.phoneNumber : '', [Validators.pattern(/^\+?\d{9,15}$/)]
    ),
    birthDate: this._formBuilder.control<Date>(
      this.user?.birthDate ? this.user.birthDate : new Date()
    ),
  });

  onSubmit() {
    if (this.userForm.valid) {
      this.submitUser.emit(this.userForm.value as User);
    }
  }

  get email() {
    return this.userForm.get('email');
  }
  get firstname() {
    return this.userForm.get('firstname');
  }
  get lastname() {
    return this.userForm.get('lastname');
  }
  get phoneNumber() {
    return this.userForm.get('phoneNumber');
  }
  get birthDate() {
    return this.userForm.get('birthDate');
  }
}
