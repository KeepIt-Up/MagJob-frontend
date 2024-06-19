import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';
import { AUTH_STATE_VALUE, AuthState } from 'src/app/utils/auth-state.type';
import { AuthStateService } from 'src/app/auth/service/auth.state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
})
export class NavMenuComponent implements OnInit, OnDestroy {
  private authStateService = inject(AuthStateService);

  authStateValue = AUTH_STATE_VALUE;

  authStateSub?: Subscription;
  authState: AuthState = { state: AUTH_STATE_VALUE.IDLE };

  ngOnInit(): void {
    this.authStateSub = this.authStateService.state$.subscribe({
      next: (state) => {
        this.authState = state;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  ngOnDestroy(): void {
    this.authStateSub?.unsubscribe();
  }

  login() {
    this.authStateService.login();
  }

  logout() {
    this.authStateService.logOut();
  }
}
