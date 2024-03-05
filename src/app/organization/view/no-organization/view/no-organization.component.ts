import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-organization',
  templateUrl: './no-organization.component.html',
  styleUrls: ['./no-organization.component.css']
})
export class NoOrganizationComponent {
  constructor(private router: Router) {}
  viewOrganization(): void {
    // Implement the logic to handle the "View Organization" button click
    this.router.navigate(['/organizations']);
  }

  createOrganization(): void {
    // Implement the logic to handle the "Create Organization" button click
    this.router.navigate(['/create-organization']);
  }
}
