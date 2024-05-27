// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor,
// } from '@angular/common/http';
// import { Observable } from 'rxjs';

// import { OAuthService } from 'angular-oauth2-oidc';

// @Injectable()
// export class TokenInterceptor implements HttpInterceptor {
//   constructor(private oauthService: OAuthService) {}

//   intercept(
//     request: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     const token = this.oauthService.getAccessToken();

//     if (token) {
//       request = request.clone({
//         setHeaders: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//     }

//     return next.handle(request);
//   }
// }

import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";

import { inject } from "@angular/core";
import { OAuthService } from "angular-oauth2-oidc";
import { catchError, throwError } from "rxjs";

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
  let authService = inject(OAuthService);

  let authReq = req.clone();

  if (authService.hasValidAccessToken()) {
    const token = authService.getAccessToken();
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Pass the cloned request with the updated header to the next handler
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !authReq.url.includes('refreshToken')) {
        // Wygaśniecie tokena - próba odświeżenia tokenu
        authService.refreshToken();
      }
      return throwError(() => error);
    })
  );
};
