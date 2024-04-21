import { Component, Input, OnDestroy } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { AnnouncementsCardComponent } from 'src/app/organization/announcement/ui/announcements-card/announcements-card.component';

@Component({
  selector: 'app-organization-home-page',
  standalone: true,
  imports: [AnnouncementsCardComponent],
  templateUrl: './organization-home.component.html',
})
export class OrganizationHomeComponent implements OnDestroy {
  @Input() organizationId!: string;

  routeSub?: Subscription;

  constructor(route: ActivatedRoute) {
    route.parent?.paramMap.subscribe({
      next: (value) => {
        const organizationId = value.get('id');
        if (organizationId !== null) {
          this.organizationId = organizationId;
        } else {
          alert('Error while getting organizationId from route');
        }
      },
      error: (err) =>
        {
          console.log(err)
        }
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }
}
