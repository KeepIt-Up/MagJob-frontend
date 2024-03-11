import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { LoginComponent } from './login/view/login.component';
import { RegisterComponent } from './register/view/register.component';
import { HomeComponent } from './home/view/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserProfileComponent } from './user/components/user-profile/view/user-profile.component';
import { UserSettingsComponent } from './user/components/user-settings/view/user-settings.component';
import { OrganizationHomePageComponent } from './organization/components/organization-home-page/view/organization-home-page.component';
import { OrganizationSettingsComponent } from './organization/components/organization-settings/view/organization-settings.component';
import { JwtInterceptor } from './jwt/jwt.interceptor';
import { UserOrganizationComponent } from './user/components/user-organization/view/user-organization.component';
import { OrganizationCreationComponent } from './organization/view/organization-creation/view/organization-creation.component';
import { NoOrganizationComponent } from './organization/view/no-organization/view/no-organization.component';
import { UserInvitationsComponent } from './invitations/view/user-invitations/view/user-invitations.component';
import { ListMembersComponent } from './organization/components/organization-members/view/list-members/list-members.component';
import { OrganizatonNavComponent } from './organization/components/organizaton-nav/organizaton-nav.component';
import { OrganizationComponent } from './organization/organization/organization.component';
import { ChooseOrganizationComponent } from './organization/view/choose-organization/view/choose-organization.component';
import { AddMembersComponent } from './organization/components/organization-members/view/add-members/add-members.component';
import { EditMemberComponent } from './organization/components/organization-members/view/edit-member/edit-member.component';
import { OrganizationScheduleComponent } from './organization/components/organization-schedule/organization-schedule.component';
import { OrganizationTasksComponent } from './organization/components/organization-tasks/organization-tasks.component';
import { OrganizationDocumentsComponent } from './organization/components/organization-documents/organization-documents.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavMenuComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    UserProfileComponent,
    UserSettingsComponent,
    OrganizationHomePageComponent,
    OrganizationSettingsComponent,
    UserOrganizationComponent,
    OrganizationCreationComponent,
    NoOrganizationComponent,
    UserInvitationsComponent,
    ListMembersComponent,
    OrganizatonNavComponent,
    OrganizationComponent,
    ChooseOrganizationComponent,
    AddMembersComponent,
    EditMemberComponent,
    OrganizationScheduleComponent,
    OrganizationTasksComponent,
    OrganizationDocumentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot([
    ]),
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
