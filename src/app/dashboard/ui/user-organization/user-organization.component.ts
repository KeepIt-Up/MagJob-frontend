import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { Organization } from 'src/app/organization/model/organization';
import { OrganizationService } from 'src/app/organization/service/organization.service';
import { Subscription } from 'rxjs';

type GetError = { status: number; message: string };

type IdleState = { state: 'idle' };
type LoadingState = { state: 'loading' };
type GetSuccessState<T> = { state: 'get-success'; result: T;};
type ErrorState = { state: 'error'; error: GetError; };

export type ComponentGetState<T> =
  | IdleState
  | LoadingState
  | GetSuccessState<T>
  | ErrorState;

@Component({
  selector: 'app-user-organizations',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor],
  templateUrl: './user-organization.component.html'
})
export class UserOrganizationComponent implements OnInit, OnDestroy {
  @Input({required: true}) userId: string | undefined;
  @Input() organizations: Organization[] = [];
  componentState: ComponentGetState<Organization[]> = { state: 'idle' };
  organizationSub!: Subscription;

  constructor(private organizationService: OrganizationService) {}

  ngOnInit(): void {
    this.componentState = { state: 'loading' };

    this.organizationSub = this.organizationService.getAllByUserId(this.userId!).subscribe({
      next: (response) => {
        console.log(response)
        this.componentState = { state: 'get-success', result: response.organizations};
      },
      error: (err) => {
        this.componentState = { state: 'error', error: err };
      },
    });
  }

  ngOnDestroy(): void {
    this.organizationSub.unsubscribe();
  }
}
