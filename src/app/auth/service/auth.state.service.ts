import {HttpErrorResponse} from '@angular/common/http';
import {inject, Injectable, signal} from '@angular/core';
import {toObservable} from '@angular/core/rxjs-interop';
import {OAuthService, OAuthSuccessEvent} from 'angular-oauth2-oidc';
import {firstValueFrom, Observable, Subscription} from 'rxjs';
import {User} from 'src/app/user/model/user';
import {UserService} from 'src/app/user/service/user.service';
import {AUTH_STATE_VALUE, AuthState} from 'src/app/utils/auth-state.type';
import {ENTITY_STATE_VALUE} from 'src/app/utils/entity-state.type';
import {MemberRoleService} from "../../roles/service/member-role.service";
import {RoleService} from "../../roles/service/role.service";
import {RoleResponse} from "../../roles/model/role";

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private oauthService = inject(OAuthService);
  private userService = inject(UserService);
  private roleMemberService = inject(MemberRoleService);
  private roleService = inject(RoleService);

  private $authState = signal<AuthState>({ state: AUTH_STATE_VALUE.IDLE });

  private oauthEventsSubscription?: Subscription;
  private userStateSubscription?: Subscription;

  role: boolean = true;

  state$ = toObservable(this.$authState);

  constructor() {
    if (this.oauthService.hasValidAccessToken()) {
      const claims = this.oauthService.getIdentityClaims();
      this.userExistingCheck(claims['sub']);
          this.initUserData(claims['sub']);

    }

    this.subscribeOAuthEvents();
  }

  logOut() {
    this.oauthService.logOut();
    this.oauthEventsSubscription?.unsubscribe();
    this.$authState.set({ state: AUTH_STATE_VALUE.NOT_LOGGED_IN });
  }

  login() {
    this.oauthService.initCodeFlow();
    this.subscribeOAuthEvents();
  }

  /**
   * Listen for token_received event
   */
  private subscribeOAuthEvents() {
    this.oauthEventsSubscription = this.oauthService.events.subscribe({
      next: (value) => {
        if (
          value instanceof OAuthSuccessEvent &&
          value.type == 'token_received'
        ) {
          const claims = this.oauthService.getIdentityClaims();
          this.userExistingCheck(claims['sub']);
              this.initUserData(claims['sub']);
        }
      },
    });
  }

  /**
   * Check that owner of the token exist in API database
   * @param userUid user uid form the token
   */
  private userExistingCheck(userUid: string) {
    this.userService.getByUid(userUid).subscribe({
      next: (value: User) => {
        this.$authState.set({ state: AUTH_STATE_VALUE.LOGGED_IN, user: value });
      },
      error: (error: HttpErrorResponse) => {
        if (error.status == 404) {
          this.createUser();
        }
      },
    });
  }

  private initUserData(userUid: string) {
    this.userStateSubscription = this.userService.state$.subscribe({
      next: (state) => {
        if (
          state.state == ENTITY_STATE_VALUE.IDLE
        ) {
          this.userService.initUserData(userUid);
        }
      },
    });
  }

  /**
   * Create user from the token
   */
  private createUser() {
    this.userService.create().subscribe({
      next: (value) => {
        this.$authState.set({
          state: AUTH_STATE_VALUE.LOGGED_IN,
          user: value,
        });
      },
      error: (error) => {
        window.confirm(
          'We have a problem with your account. Please contact with our support or try again'
        );
        this.oauthService.logOut();
      },
    });
  }

  getUserID(): string {
    const claims: any = this.oauthService.getIdentityClaims();
    return claims.sub
  }

  async getUserPermissions(question: string): Promise<boolean> {
    try {
      const role = await firstValueFrom(this.roleService.getRoleById("1"));

      switch (question) {
      case 'Task':
        return role.canManageTasks;

      case 'Announcement':
        return role.canManageAnnouncements;

      case 'Invitation':
        return role.canManageInvitations;

      case 'Role':
        return role.canManageRoles;

      default:
        return false;
      }
    } catch (err) {
      console.error('Failed to load role:', err);
      return false;
    }
  }
}
