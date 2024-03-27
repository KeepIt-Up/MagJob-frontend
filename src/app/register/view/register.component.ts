import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { Register } from '../model/register';
import { RegisterService } from '../service/register.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

type RegisterForm = FormGroup<{
  email: FormControl<string>;
  password: FormControl<string>;
  passwordConfirmation: FormControl<string>;
  firstname: FormControl<string>;
  lastname: FormControl<string>;
}>;

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  registerForm!: RegisterForm;
  private _formBuilder = inject(NonNullableFormBuilder);

  constructor(
    private RegisterService: RegisterService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
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
      passwordConfirmation: this._formBuilder.control<string>('', [
        Validators.required,
      ]),
      firstname: this._formBuilder.control<string>('', [
        Validators.pattern('^[a-zA-Z0-9]*$'), Validators.required
      ]),
      lastname: this._formBuilder.control<string>('', [
        Validators.pattern('^[a-zA-Z0-9]*$'), Validators.required
      ]),  
    }, {validators: [
      this.passwordsMatchValidator.bind(this)
    ]});
  }

  onSubmit() {
    console.log(this.registerForm.value)
    if (this.registerForm.valid) {
      this.RegisterService.register(this.registerForm.value as Register).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          localStorage.clear();
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Registration failed:', error);
        }
      });
    }
  }

  passwordsMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.get('password');
    const passwordConfirmation = control.get('passwordConfirmation');

    // Check if both password and confirmPassword controls have values and they match
    if (password?.value !== passwordConfirmation?.value) {
      // If passwords don't match, set an error
      passwordConfirmation?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      // If passwords match, clear the error
      passwordConfirmation?.setErrors(null);
    }

    return null;
  }
}
