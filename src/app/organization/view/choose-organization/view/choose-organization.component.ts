import { UserService } from 'src/app/user/service/user.service';
import { Organization } from './../../../model/organization';
import { OrganizationService } from 'src/app/organization/service/organization.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-choose-organization',
  templateUrl: './choose-organization.component.html',
  styleUrls: ['./choose-organization.component.css']
})
export class ChooseOrganizationComponent implements OnInit {
  organizations: Organization[] = [];
  data1: any[] = [];
  userId: number | null = null;

  constructor(private organizationService: OrganizationService, private userService: UserService ) {}

  ngOnInit(): void {
    this.loadUserOrganizations();
  }

  loadUserOrganizations() {
    this.userId = this.userService.getCurrentUserId();
  
    if (this.userId != null) {
      this.organizationService.getUserOrganizations(this.userId).subscribe(
        (data: { organizations: Organization[] }) => {
          if (Array.isArray(data.organizations)) {
            this.organizations = data.organizations;
          } else {
            console.error('Invalid data format. Expected an array, but received:', data.organizations);
            this.organizations = [];
          }
        },
        (error) => {
          console.error('Error while getting organizations:', error);
          this.organizations = [];
        }
      );
    }
  }
  
  setOrganizationId(organization: Organization)
  {
    this.organizationService.setCurrentOrganizationId(organization);
  }
  
  
  
  
  


}
