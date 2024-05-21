import { Component } from '@angular/core';
import { ListDocumentsComponent } from "./view/list-documents/list-documents.component";
import { OrganizationDocumentsService } from './service/organization-documents.service';
import { ActivatedRoute } from '@angular/router';
import { OrganizationService } from '../../service/organization.service';

@Component({
    selector: 'app-organization-documents',
    standalone: true,
    templateUrl: './organization-documents.component.html',
    styleUrls: ['./organization-documents.component.css'],
    imports: [ListDocumentsComponent]
})
export class OrganizationDocumentsComponent {
  organizationId?: number;

  constructor(private route: ActivatedRoute, private organizationService: OrganizationService, private organizationDocumentsService: OrganizationDocumentsService) {}

  ngOnInit(): void {
    this.organizationId = this.organizationService.getCurrentOrganizationId();
  }
}

