import { Component } from '@angular/core';
import { OrganizationService } from '../../service/organization.service';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-organizaton-nav',
  templateUrl: './organizaton-nav.component.html',
  styleUrls: ['./organizaton-nav.component.css']
})
export class OrganizatonNavComponent {

  constructor(private _oauthService: OAuthService, private organizationService: OrganizationService) {}

  getCurrentOrganizationId(): number | null {
    const currentOrganization = this.organizationService.getCurrentOrganizationId();
    return currentOrganization ? currentOrganization : null;
  }
}
