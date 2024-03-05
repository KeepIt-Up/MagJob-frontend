import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrganizationCreation } from "../../../model/organization-creation";
import { OrganizationCreationService } from '../../organization-creation/service/organization-creation.service';
import { OrganizationService } from 'src/app/organization/service/organization.service';

@Component({
  selector: 'app-organization-creation',
  templateUrl: './organization-creation.component.html',
  styleUrls: ['./organization-creation.component.css']
})
export class OrganizationCreationComponent {

  organizationModel: OrganizationCreation = {
    name: '',
    profileBannerUrl: '',
    user: 0
  };

  organizationForm: FormGroup;
  selectedBannerUrl: string = '';

  constructor(private organizationCreationService: OrganizationCreationService, private fb: FormBuilder, private router: Router, private organizationService: OrganizationService) {
    this.organizationForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  onSubmit() {
    const { name } = this.organizationForm.value;

    if (this.organizationForm.valid) {
      this.organizationModel.name = name;
      this.organizationModel.profileBannerUrl = ""; //this.selectedBannerUrl
      this.organizationModel.user = parseInt(localStorage.getItem("User") ?? "0");


      this.organizationCreationService.createOrganization(this.organizationModel).subscribe(
        (response) => {
          console.log('Organization created successfully:', response);
          this.organizationService.setCurrentOrganizationId(response);
          this.router.navigate(['/organization/'+response.id+'/addMembers']);
        },
        (error) => {
          console.error('Error creating organization:', error);
        }
      );
    }
  }

  selectBannerUrl(url: string) {
    this.selectedBannerUrl = url;
  }
}
