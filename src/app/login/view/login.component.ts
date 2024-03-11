import { AuthService } from '../../jwt/auth.service';
import { Component } from '@angular/core';
import { Login } from '../model/login';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/service/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl(
      '',
      [
        Validators.email,
        Validators.required
      ]),
    password: new FormControl(
      '',
      [
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{5,}$'),
        Validators.required
      ])
  });

  loginModel: Login = new Login('', ''); // Initialize with empty values

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {}


submitApplication() {
  //clear local storage before login
  localStorage.clear();

  if (!(this.loginForm.invalid && (this.loginForm.dirty || this.loginForm.touched)) && this.loginModel.email && this.loginModel.password) {
    this.authService.login(this.loginModel).pipe(
      switchMap((response) => {
        localStorage.setItem('access_token', response.jwt);
        this.userService.setCurrentUserId(response.user);
        return this.userService.belongToAnyOrganization(); // Zwraca Observable<boolean>
      })
    ).subscribe(
      (belongsToAnyOrganization: boolean) => {
        if (belongsToAnyOrganization == false) {
          this.router.navigate(['/noorganization']);
        } else {
          const userId = this.userService.getCurrentUserId(); // Użyj odpowiedniej metody do uzyskania ID użytkownika
          this.router.navigate(['/chooseorganization']);
        }
      },
      (error) => {
        console.error('Login failed:', error);
        // Obsłuż błąd, jeśli wystąpi
      }
    );
  }
}

  
}
