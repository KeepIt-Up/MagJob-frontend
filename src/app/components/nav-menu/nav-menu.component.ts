import { UserService } from './../../user/service/user.service';
import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from 'src/app/auth/auth.config';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

  constructor(
    private _oauthService: OAuthService,
    private userService: UserService
  ) { }

  login() 
  {
    this._oauthService.initCodeFlow();
  }

  logout() 
  {
    this._oauthService.logOut();
  }

  getUserId()
  {
    this.userService.getCurrentUserId();
  }

  isLoggedIn(): boolean
  {
    return this._oauthService.hasValidAccessToken();
  }

}
