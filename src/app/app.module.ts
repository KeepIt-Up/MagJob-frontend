import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './home/view/home.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { OAuthService, provideOAuthClient } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './auth/auth.config';
import { TokenInterceptor } from './auth/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    FooterComponent,
    NavMenuComponent,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot([
    ]),
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    provideHttpClient(),
    provideOAuthClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: (oauthService: OAuthService) => {
        return () => {
          initializeOAuth(oauthService);
        }
      },
      multi: true,
      deps: [
        OAuthService
      ]
    },
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: TokenInterceptor,
      multi: true 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

function initializeOAuth(oauthService: OAuthService): Promise<void>
{
    return new Promise((resolve) => {
        oauthService.configure(authCodeFlowConfig);
        oauthService.setupAutomaticSilentRefresh();
        oauthService.loadDiscoveryDocumentAndLogin()
        .then(() => {resolve()});
    });
}