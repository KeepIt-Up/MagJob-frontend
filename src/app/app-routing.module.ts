import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/view/home.component';
import { RegisterComponent } from './register/view/register.component';
import { AuthGuard } from './auth/auth.guard';
import { OrganizationCreationComponent } from './organization/view/organization-creation/view/organization-creation.component';
import { OrganizationComponent } from './organization/organization/organization.component';
import { OrganizationHomeComponent } from './organization/components/organization-home-page/view/organization-home.page.component';
import { ListMembersComponent } from './organization/components/organization-members/view/list-members/list-members.component';
import { AddMembersComponent } from './organization/components/organization-members/view/add-members/add-members.component';
import { OrganizationScheduleComponent } from './organization/components/organization-schedule/organization-schedule.component';
import { OrganizationSettingsComponent } from './organization/components/organization-settings/view/organization-settings.component';
import { OrganizationTasksComponent } from './organization/components/organization-tasks/organization-tasks.component';
import { OrganizationDocumentsComponent } from './organization/components/organization-documents/organization-documents.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.page.component';
import { OrganizationListComponent } from './organization/view/organization-list/organization-list.page.component';
import { RolesComponent } from './roles/roles.page.component';
import { RoleDetailsComponent } from './roles/role-details.page.component';
import { UserProfileComponent } from './user/user-profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  {
    path: 'dashboard/:userId',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'welcome', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'user/:id',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'organization/create',
    component: OrganizationCreationComponent,
    canActivate: [AuthGuard],
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
      { path: 'settings', component: OrganizationSettingsComponent },
      { path: 'tasks', component: OrganizationTasksComponent },
      { path: 'documents', component: OrganizationDocumentsComponent },
      { path: 'addMembers',component: AddMembersComponent},
      { path: 'roles',component: RolesComponent},
      { path: 'roles/:roleId',component: RoleDetailsComponent},
    ]
  },
  { path: '**', redirectTo: '/welcome' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
