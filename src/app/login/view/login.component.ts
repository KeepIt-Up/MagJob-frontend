import { Component } from '@angular/core';
import { Login } from '../model/login';
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

  constructor(private router: Router, private userService: UserService) {}


submitApplication() {
  
  }
}