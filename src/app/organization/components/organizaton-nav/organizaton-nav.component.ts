import { Component } from '@angular/core';
import { AuthService } from './../../../jwt/auth.service';
import { OrganizationService } from '../../service/organization.service';

@Component({
  selector: 'app-organizaton-nav',
  templateUrl: './organizaton-nav.component.html',
  styleUrls: ['./organizaton-nav.component.css']
})
export class OrganizatonNavComponent {

  constructor(private authService: AuthService, private organizationService: OrganizationService) {}

  getCurrentOrganizationId(): number | null {
    const currentOrganization = this.organizationService.getCurrentOrganizationId();
    return currentOrganization ? currentOrganization : null;
  }
}
