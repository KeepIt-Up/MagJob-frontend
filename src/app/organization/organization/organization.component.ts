import { Component } from '@angular/core';
import { OrganizatonNavComponent } from '../components/organizaton-nav/organizaton-nav.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-organization',
  standalone: true,
  imports: [OrganizatonNavComponent, RouterOutlet],
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent {

}
