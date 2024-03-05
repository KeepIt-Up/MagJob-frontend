import { UserService } from './../../user/service/user.service';
import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from 'src/app/auth/auth.config';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
})
export class NavMenuComponent {

  isLoggedIn: boolean = false;

  constructor(
    private _oauthService: OAuthService,
    private userService: UserService
  ) {
    this.configure();
  }

  private configure()
  {
    this._oauthService.configure(authConfig);
    this._oauthService.loadDiscoveryDocumentAndTryLogin();
  }

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

}
