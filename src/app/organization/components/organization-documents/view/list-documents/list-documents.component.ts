import { Component, Input } from '@angular/core';
import { DocumentPreviewModel } from '../../model/document';
import { OrganizationDocumentsService } from '../../service/organization-documents.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-list-documents',
  standalone: true,
  imports: [NgFor],
  templateUrl: './list-documents.component.html',
  styleUrls: ['./list-documents.component.css']
})
export class ListDocumentsComponent {
    @Input({ required: true }) organizationId!: number;
    documentData: DocumentPreviewModel[] = [];

    constructor(private organizationDocumentsService: OrganizationDocumentsService) {}
    
    ngOnInit(): void {
        this.loadDocumentPreviews();
    }
  
    loadDocumentPreviews(): void {
        // todo fix 403
        this.organizationDocumentsService.getOrganizationMaterialsPreviews(this.organizationId).subscribe({
        next:(data) => {
          console.log("Fetch successful")
          this.documentData = data.materials as DocumentPreviewModel[];
        },
        error: (error) => {
          console.error('Error fetching documents:', error);
        }
        });

        this.documentData = [
            {"id": 0, "title": "document.docx"}, 
            {"id": 1, "title": "text.txt"}, 
            {"id": 2, "title": "code.c"}];
    }
    
}