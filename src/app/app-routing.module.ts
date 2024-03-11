import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user/components/user-profile/view/user-profile.component';
import { UserSettingsComponent } from './user/components/user-settings/view/user-settings.component';
import { HomeComponent } from './home/view/home.component';
import { LoginComponent } from './login/view/login.component';
import { RegisterComponent } from './register/view/register.component';
import { NoOrganizationComponent } from './organization/view/no-organization/view/no-organization.component';
import { AuthGuard } from './jwt/auth.guard';
import { OrganizationCreationComponent } from './organization/view/organization-creation/view/organization-creation.component';
import { OrganizationComponent } from './organization/organization/organization.component';
import { OrganizationHomePageComponent } from './organization/components/organization-home-page/view/organization-home-page.component';
import { ChooseOrganizationComponent } from './organization/view/choose-organization/view/choose-organization.component';
import { ListMembersComponent } from './organization/components/organization-members/view/list-members/list-members.component';
import { AddMembersComponent } from './organization/components/organization-members/view/add-members/add-members.component';
import { OrganizationScheduleComponent } from './organization/components/organization-schedule/organization-schedule.component';
import { OrganizationSettingsComponent } from './organization/components/organization-settings/view/organization-settings.component';
import { OrganizationTasksComponent } from './organization/components/organization-tasks/organization-tasks.component';
import { OrganizationDocumentsComponent } from './organization/components/organization-documents/organization-documents.component';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user/:id', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'user/:userId/settings', component: UserSettingsComponent, canActivate: [AuthGuard] },
  { path: 'create-organization', component: OrganizationCreationComponent, canActivate: [AuthGuard] },
  { path: 'noorganization', component: NoOrganizationComponent, canActivate: [AuthGuard] },
  { path: 'chooseorganization', component: ChooseOrganizationComponent, canActivate: [AuthGuard] },
  {
    path: 'organization/:id',
    component: OrganizationComponent,
    children: [
      { path: 'home', component: OrganizationHomePageComponent },
      { path: 'schedule', component: OrganizationScheduleComponent },
      { path: 'members', component: ListMembersComponent },
      { path: 'settings', component: OrganizationSettingsComponent },
      { path: 'tasks', component: OrganizationTasksComponent },
      { path: 'documents', component: OrganizationDocumentsComponent },
      { path: 'addMembers',component: AddMembersComponent}
    ]
  },
  { path: '**', redirectTo: '/welcome' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
