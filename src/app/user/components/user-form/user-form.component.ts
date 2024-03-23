import { Component, EventEmitter, Output, inject } from '@angular/core';
import {
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
  NonNullableFormBuilder,
} from '@angular/forms';
import { CreateUserRequest } from '../../model/create-user-request';
import { NgIf } from '@angular/common';

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
  @Output() createUser = new EventEmitter<CreateUserRequest>();

  private _formBuilder = inject(NonNullableFormBuilder);

  userForm: UserForm = this._formBuilder.group({
    email: this._formBuilder.control<string>('', [
      Validators.email,
      Validators.required,
    ]),
    firstname: this._formBuilder.control<string>('', [
      Validators.pattern('^[a-zA-Z0-9]*$'),
      Validators.required,
    ]),
    lastname: this._formBuilder.control<string>('', [
      Validators.pattern('^[a-zA-Z0-9]*$'),
      Validators.required,
    ]),
    phoneNumber: this._formBuilder.control<string>(''),
    birthDate: this._formBuilder.control<Date>(new Date(), [
      Validators.required,
    ]),
  });

  onSubmit() {
    if (this.userForm.valid) {
      this.createUser.emit(this.userForm.value as CreateUserRequest);
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
