import { AuthConfig, OAuthService } from "angular-oauth2-oidc";

export const authCodeFlowConfig: AuthConfig = {
    issuer: 'http://localhost:8180/realms/master',
    tokenEndpoint: 'http://localhost:8180/realms/master/protocol/openid-connect/token',
    redirectUri: window.location.origin + "/welcome",
    clientId: 'magjob-angular-client',
    responseType: 'code',
    scope: 'openid profile',
}

