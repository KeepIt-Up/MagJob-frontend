import { Component, Input } from '@angular/core';
import { DocumentPreviewModel } from '../../model/document';
import { OrganizationDocumentsService } from '../../service/organization-documents.service';
import { NgFor } from '@angular/common';
import { FilterDocumentsComponent } from "../filter-documents/filter-documents.component";

@Component({
    selector: 'app-list-documents',
    standalone: true,
    templateUrl: './list-documents.component.html',
    styleUrls: ['./list-documents.component.css'],
    imports: [NgFor, FilterDocumentsComponent]
})
export class ListDocumentsComponent {
    @Input({ required: true }) organizationId!: number;
    allDocumentsData: DocumentPreviewModel[] = [];
    documentsData: DocumentPreviewModel[] = [];

    constructor(private organizationDocumentsService: OrganizationDocumentsService) {}
    
    ngOnInit(): void {
        this.loadDocumentPreviews();
    }
  
    loadDocumentPreviews(): void {
        // todo fix 403
        this.organizationDocumentsService.getOrganizationMaterialsPreviews(this.organizationId).subscribe({
        next:(data) => {
          console.log("Fetch successful")
          this.allDocumentsData = data.materials as DocumentPreviewModel[];
        },
        error: (error) => {
          console.error('Error fetching documents:', error);
        }
        });

        this.allDocumentsData = [
            {"id": 0, "title": "document.docx"}, 
            {"id": 1, "title": "text.txt"}, 
            {"id": 2, "title": "code.c"}];

        this.documentsData = this.allDocumentsData;
    }

    applyFilters(searchTerm: string) {
      this.documentsData = this.allDocumentsData.filter((value) => value.title.includes(searchTerm));
    }
    
}