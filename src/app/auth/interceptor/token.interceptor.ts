import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private _oauthService: OAuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this._oauthService.hasValidAccessToken())
    {
      request = request.clone({
        setHeaders: { 'Authorization': `Bearer ${this._oauthService.getAccessToken()}` }
      });
    }
    return next.handle(request);
  }
}
