import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Register } from '../model/register'
import { RegisterService } from '../service/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private RegisterService: RegisterService,
    private formBuilder: FormBuilder, 
    private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.email,
          Validators.required
        ]],
      password: [
        '',
        [
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{5,}$'),
          Validators.required
        ]],
      passwordConfirmation: [
        '',
        [
          Validators.required
        ]],
      firstname: [
        '',
        [
          Validators.pattern('^[a-zA-Z0-9]*$'),
          Validators.required
        ]],
      lastname: [
        '',
        [
          Validators.pattern('^[a-zA-Z0-9]*$'),
          Validators.required
        ]],
    },
    {validator: this.passwordsMatchValidator.bind(this)}
    );
  }

  onSubmit() {
    
    if (this.registerForm.valid) {
      //create model from form
      const register: Register = {
        firstname: this.registerForm.get('firstname')!.value,
        lastname: this.registerForm.get('lastname')!.value,
        email: this.registerForm.get('email')!.value,
        password: this.registerForm.get('password')!.value,
      };
      // Call the registration service to register the user
      this.RegisterService.register(register).subscribe(
        (response) => {
          console.log('Registration successful:', response);
          localStorage.clear();
          this.router.navigate(['/login']);
          // Add any additional logic after a successful registration
        },
        (error) => {
          console.error('Registration failed:', error);
          // Handle registration failure (show error message, etc.)
        }
      );
    }
  }

  passwordsMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const passwordConfirmation = control.get('passwordConfirmation');

    // Check if both password and confirmPassword controls have values and they match
    if (password?.value !== passwordConfirmation?.value) {
      // If passwords don't match, set an error
      passwordConfirmation?.setErrors({ 'passwordMismatch': true });
      return { 'passwordMismatch': true };
    } else {
      // If passwords match, clear the error
      passwordConfirmation?.setErrors(null);
    }

    return null;
  }
}
