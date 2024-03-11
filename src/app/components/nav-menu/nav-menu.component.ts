import { UserService } from './../../user/service/user.service';
import { AuthService } from './../../jwt/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  constructor(private authService: AuthService, private userService: UserService) {}

  isExpanded = false;
  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  getUserId(): number | null {
    const currentUser = this.userService.getCurrentUserId();
    return currentUser ? currentUser : null;
  }

  logout(): void {
    this.authService.logout();
    this.userService.clearCurrentUser();
    // Optionally, navigate to the login page or another route
    // this.router.navigate(['/login']);
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
