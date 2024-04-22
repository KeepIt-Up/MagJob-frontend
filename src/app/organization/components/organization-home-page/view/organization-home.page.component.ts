import { Component, Input } from '@angular/core';
import { AnnouncementsCardComponent } from 'src/app/organization/announcement/ui/announcements-card/announcements-card.component';

@Component({
  selector: 'app-organization-home-page',
  standalone: true,
  imports: [AnnouncementsCardComponent],
  templateUrl: './organization-home.component.html',
})
export class OrganizationHomeComponent {
  @Input() organizationId!: string;

  constructor() { }

  ngOnDestroy(): void {

  }
}
