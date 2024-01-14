import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationUserLoginData } from '@core/interfaces/authentication-user-data';
import { AuthService } from '@core/services/auth.service';
import { GoogleApiService } from '@core/services/google-api.service';
import { UserService } from '@core/services/user.service';
import { TranslocoModule } from '@ngneat/transloco';
import { LoginFormCreatorService } from '@pages/auth/services/login-form-creator.service';
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslocoModule,
  ],
  providers: [
    AuthService,
    OAuthService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  formCreator = inject(LoginFormCreatorService);
  authService = inject(AuthService);
  userService = inject(UserService);
  router = inject(Router);
  googleService = inject(GoogleApiService);
  oservce = inject(OAuthService);


  ngOnInit(): void {
    this.form = this.formCreator.getLoginForm();
  }

  login(){
    let user : AuthenticationUserLoginData = this.form.value;
    this.authService.login(user).subscribe((res : {token: any})=>{
      this.userService.setUserToken(res.token);
      console.log(this.userService.getUserToken());
      this.userService.isLogged();
      this.router.navigateByUrl('home');
    })
  }

  redirectToOAuthProvider() {
    this.googleService.login();
  }

}
