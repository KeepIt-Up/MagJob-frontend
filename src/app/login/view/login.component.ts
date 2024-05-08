import { AuthService } from '../../jwt/auth.service';
import { Component, OnInit, inject } from '@angular/core';
import { Login } from '../model/login';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/service/user.service';
import { NgIf } from '@angular/common';

type LoginForm = FormGroup<{
  email: FormControl<string>;
  password: FormControl<string>;
}>;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm!: LoginForm;
  private _formBuilder = inject(NonNullableFormBuilder);
  private _router = inject(Router);

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: this._formBuilder.control<string>('', [
        Validators.email,
        Validators.required,
      ]),
      password: this._formBuilder.control<string>('', [
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{5,}$'
        ),
        Validators.required,
      ]),
    });
  }

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  submitApplication() {
    //clear local storage before login
    localStorage.clear();

    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value as Login).subscribe({
        next: (response) => {
          console.log(response);
          localStorage.setItem('access_token', response.jwt);
          this.userService.setCurrentUserId(response.user);
          this._router.navigate([
            '/dashboard',
            this.userService.getCurrentUserId(),
          ]);
        },
        error: (err) => {
          console.error('Login failed:', err);
        },
      });
    }
  }
}
