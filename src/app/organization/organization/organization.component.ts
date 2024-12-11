import { Component, Input } from '@angular/core';
import { OrganizatonNavComponent } from '../components/organizaton-nav/organizaton-nav.component';
import { RouterOutlet } from '@angular/router';
import { ListMembersComponent } from '../components/organization-members/view/list-members/list-members.component';
import { AddMembersComponent } from '../components/organization-members/view/add-members/add-members.component';
import {ChatsComponent} from "../chats/chats.component";

@Component({
  selector: 'app-organization',
  standalone: true,
  imports: [OrganizatonNavComponent, RouterOutlet, ChatsComponent],
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent {
  @Input() organizationId?: string;

  handleRouterActivation(component: any) {
    if(component instanceof ListMembersComponent)
    {
      component.organizationId = Number(this.organizationId);
    }
    if(component instanceof AddMembersComponent)
    {
      component.organizationId = this.organizationId;
    }
  }
}
