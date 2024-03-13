import { AuthConfig, OAuthService } from "angular-oauth2-oidc";

export const authCodeFlowConfig: AuthConfig = {
    issuer: 'http://localhost:8180/realms/magjob-realm',
    tokenEndpoint: 'http://localhost:8180/realms/magjob-realm/protocol/openid-connect/token',
    redirectUri: window.location.origin,
    clientId: 'magjob-angular-client',
    responseType: 'code',
    scope: 'openid profile',
}

