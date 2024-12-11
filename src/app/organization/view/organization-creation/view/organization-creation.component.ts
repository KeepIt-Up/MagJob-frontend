import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrganizationCreation } from "../../../model/organization-creation";
import { OrganizationCreationService } from '../../organization-creation/service/organization-creation.service';
import { OrganizationService } from 'src/app/organization/service/organization.service';
import { AuthStateService } from 'src/app/auth/service/auth.state.service';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-organization-creation',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './organization-creation.component.html',
  styleUrls: ['./organization-creation.component.css']
})
export class OrganizationCreationComponent {
  private authService = inject(AuthStateService);
  private oauthService = inject(OAuthService);

  authState$ = this.authService.state$;

  organizationModel: OrganizationCreation = {
    name: '',
    profileBannerUrl: '',
    userId: ''
  };

  organizationForm: FormGroup;
  selectedBannerUrl: string = '';

  constructor(private fb: FormBuilder, private router: Router, private organizationService: OrganizationService) {
    this.organizationForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  onSubmit() {
    const { name } = this.organizationForm.value;

    if (this.organizationForm.valid) {
      this.organizationModel.name = name;
      this.organizationModel.profileBannerUrl = ""; //this.selectedBannerUrl

      this.authState$.subscribe({next: (state) => {
        if(state.state == "LOGGED_IN")
          {
            this.organizationModel.userId = state.user.id;
            this.organizationService.create(this.organizationModel).subscribe({
              next:(response) => {
                this.oauthService.silentRefresh();
                this.organizationService.setCurrentOrganizationId(response);
                this.router.navigate(['/organization/'+response.id+'/addMembers']);
              },
              error: (error) => {
                console.error('Error creating organization:', error);
              }
            });
          }
      }}).unsubscribe();
    }
  }

  selectBannerUrl(url: string) {
    this.selectedBannerUrl = url;
  }
}
