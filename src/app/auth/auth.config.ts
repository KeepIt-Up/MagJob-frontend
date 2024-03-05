import { AuthConfig } from "angular-oauth2-oidc";

export const authConfig: AuthConfig = {
    issuer: 'https://localhost:28443/realms/master',
    redirectUri: window.location.origin,
    clientId: 'angular-client',
    responseType: 'code',
    strictDiscoveryDocumentValidation: true,
    scope: 'openid profile email offline_access',
}