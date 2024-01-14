import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Observable, Subject } from 'rxjs';

const authCodeFlowConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: "http://localhost/auth/google",
  clientId: '327400792169-32m0vnt9813vu487ll01hg8uqkt79t3q.apps.googleusercontent.com',
  scope: 'openid profile email',
  showDebugInformation: true,
};

// export interface UserInfo {
//   info: {
//     sub: string
//     email: string,
//     name: string,
//     picture: string
//   }
// }

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {

  constructor(private readonly oAuthService: OAuthService, private readonly httpClient: HttpClient) {
    oAuthService.configure(authCodeFlowConfig);

    // loading the discovery document from google, which contains all relevant URL for
    // the OAuth flow, e.g. login url

  }


  login(){
    this.oAuthService.loadDiscoveryDocument().then( () => {
      // // This method just tries to parse the token(s) within the url when
      // // the auth-server redirects the user back to the web-app
      // // It doesn't send the user the the login page
      this.oAuthService.tryLoginImplicitFlow().then( () => {

        // when not logged in, redirecvt to google for login
        // else load user profile
        if (!this.oAuthService.hasValidAccessToken()) {
          this.oAuthService.initLoginFlow()
        } else {
          this.oAuthService.loadUserProfile().then( (userProfile: any) => {
            console.log(JSON.stringify(userProfile))
          })
        }

      })
    });
  }
}
