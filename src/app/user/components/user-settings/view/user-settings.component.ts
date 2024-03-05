import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UserSettingsService } from '../../../service/user-settings.service';
import { ActivatedRoute } from '@angular/router';
import { PasswordChange } from '../../../model/password-change';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  passwordForm!: FormGroup;
  userId: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userSettingsService: UserSettingsService
  ) {
    this.userId = +this.route.snapshot.paramMap.get('userId')!;
  }

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      newPassword: ['', [
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{5,}$'),
        Validators.required
      ]],
      confirmNewPassword: ['', [Validators.required]],
    }, {
      validator: this.passwordMatchValidator.bind(this)
    });
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const newPassword = control.get('newPassword');
    const confirmNewPassword = control.get('confirmNewPassword');

    // Check if both password and confirmPassword controls have values and they match
    if (newPassword?.value !== confirmNewPassword?.value) {
      // If passwords don't match, set an error
      confirmNewPassword?.setErrors({ 'passwordMismatch': true });
      return { 'passwordMismatch': true };
    } else {
      // If passwords match, clear the error
      confirmNewPassword?.setErrors(null);
    }

    return null;
  }

  onSubmit(): void {
    if (this.passwordForm.valid) {
      const passwordChange: PasswordChange = {
        password: this.passwordForm.get('newPassword')!.value
      };

      this.userSettingsService.updateUserPassword(passwordChange, this.userId)
        .subscribe(updatedUserPassword => {
          // Handle successful update
          console.log('User settings updated:', updatedUserPassword);
        });
    }
  }
}
