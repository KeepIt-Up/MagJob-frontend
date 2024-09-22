import {Component, inject, Input, OnDestroy, OnInit, Signal} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-organization-documents',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './organization-documents.component.html',
  styleUrls: ['./organization-documents.component.css']
})
export class OrganizationDocumentsComponent  {
}
