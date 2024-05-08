import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-organizaton-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './organizaton-nav.component.html',
  styleUrls: ['./organizaton-nav.component.css']
})
export class OrganizatonNavComponent {
  @Input({required:true}) organizationId?: string;

}
