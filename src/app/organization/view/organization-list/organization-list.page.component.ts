import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { OrganizationService } from '../../service/organization.service';
import { Organization } from '../../model/organization';

type GetError = { status: number; message: string };

type IdleState = {state: 'idle'};
type LoadingState = {state: 'loading'};
type GetSuccessState = {state: 'get-success', result: Organization[]}
type ErrorState = {state: 'error', error: GetError};

export type OrganizationListState = IdleState | LoadingState | GetSuccessState | ErrorState;

@Component({
  selector: 'app-organization-list',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './organization-list.component.html'
})
export class OrganizationListComponent implements OnInit{

  organizationListState: OrganizationListState = {state: 'idle'};

  private organizationService = inject(OrganizationService);

  ngOnInit(): void {
    this.organizationService.getAll().subscribe({
      next: (response) => {
        this.organizationListState = {state: 'get-success', result: response.organizations };
      },
      error: (err) => {
        this.organizationListState = {state: 'error', error: err };
      }
    })
  }
}
