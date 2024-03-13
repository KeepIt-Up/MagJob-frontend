import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserProfileService } from '../../../service/user-profile.service';
import { UserProfile } from '../../../model/user-profile';
import { OAuthService } from 'angular-oauth2-oidc';
@Component({
  selector: 'app-user-organization',
  templateUrl: './user-organization.component.html',
  styleUrls: ['./user-organization.component.css']
})
export class UserOrganizationComponent implements OnInit {
  userProfile!: UserProfile;
  userId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private userProfileService: UserProfileService,
    private _oauthService: OAuthService
  ) {}

  ngOnInit(): void {
    const userIdParam = this.route.snapshot.paramMap.get('id');

    const isAuthenticated = this._oauthService.hasValidAccessToken();

    if (userIdParam !== null && isAuthenticated) {
      this.userId = +userIdParam;
      this.userProfileService.getUserProfile(this.userId)
        .subscribe(userProfile => this.userProfile = userProfile);
    } else if(userIdParam !== null){
        console.log("User id is not correct");
    }else {
        console.log("Token not present or expired");
      }
    }
  }

