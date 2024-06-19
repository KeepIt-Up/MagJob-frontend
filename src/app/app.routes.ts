import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.page.component';
import { HomeComponent } from './home/view/home.component';
import { UserProfileComponent } from './user/user-profile.component';
import { OrganizationCreationComponent } from './organization/view/organization-creation/view/organization-creation.component';
import { OrganizationListComponent } from './organization/view/organization-list/organization-list.page.component';
import { OrganizationComponent } from './organization/organization/organization.component';
import { OrganizationHomeComponent } from './organization/components/organization-home-page/view/organization-home.page.component';
import { OrganizationScheduleComponent } from './organization/components/organization-schedule/organization-schedule.component';
import { ListMembersComponent } from './organization/components/organization-members/view/list-members/list-members.component';
import { OrganizationTasksComponent } from './organization/components/organization-tasks/organization-tasks.component';
import { OrganizationDocumentsComponent } from './organization/components/organization-documents/organization-documents.component';
import { AddMembersComponent } from './organization/components/organization-members/view/add-members/add-members.component';
import { RoleDetailsComponent } from './roles/role-details.page.component';
import { RolesComponent } from './organization/settings/roles/roles.component';
import { SettingsComponent } from './organization/settings/settings/settings.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  {
    path: 'dashboard/:userId',
    component: DashboardComponent,
  },
  { path: 'welcome', component: HomeComponent },
  {
    path: 'user/:id',
    component: UserProfileComponent,
  },
  {
    path: 'organization/create',
    component: OrganizationCreationComponent,
  },
  { path: 'organization', component: OrganizationListComponent },
  {
    path: 'organization/:organizationId',
    component: OrganizationComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: OrganizationHomeComponent },
      { path: 'schedule', component: OrganizationScheduleComponent },
      { path: 'members', component: ListMembersComponent },
      { path: 'settings', component: SettingsComponent, children: [
        { path: 'roles', component: RolesComponent}
      ] },
      { path: 'tasks', component: OrganizationTasksComponent },
      { path: 'documents', component: OrganizationDocumentsComponent },
      { path: 'addMembers', component: AddMembersComponent },
      { path: 'roles/:roleId', component: RoleDetailsComponent },
    ],
  },
  {
    path: 'organization/:organizationId/settings',
    component: SettingsComponent,
  },
  { path: '**', component: PageNotFoundComponent },
];
