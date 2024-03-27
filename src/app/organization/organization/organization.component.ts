import { Component, Input } from '@angular/core';
import { OrganizatonNavComponent } from '../components/organizaton-nav/organizaton-nav.component';
import { RouterOutlet } from '@angular/router';
import { ListMembersComponent } from '../components/organization-members/view/list-members/list-members.component';

@Component({
  selector: 'app-organization',
  standalone: true,
  imports: [OrganizatonNavComponent, RouterOutlet],
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent {
  @Input() organizationId?: string;

  handleRouterActivation(component: any) {
    if(component instanceof ListMembersComponent)
    {
      component.organizationId = this.organizationId;
    }
  }
}
