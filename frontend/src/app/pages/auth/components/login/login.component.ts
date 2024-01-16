import { CommonModule } from '@angular/common';
import { Component, NgZone, OnInit, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationUserLoginData } from '@core/interfaces/authentication-user-data';
import { AuthService } from '@core/services/auth.service';
import { UserService } from '@core/services/user.service';
import { TranslocoModule } from '@ngneat/transloco';
import { LoginFormCreatorService } from '@pages/auth/services/login-form-creator.service';
import { error } from 'console';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap'

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
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  formCreator = inject(LoginFormCreatorService);
  authService = inject(AuthService);
  userService = inject(UserService);
  router = inject(Router);
  ngZone = inject(NgZone);


  ngOnInit(): void {
    this.form = this.formCreator.getLoginForm();

    //@ts-ignore
    window.onGoogleLibraryLoad = () => {
      //@ts-ignore
      google.accounts.id.initialize({
        client_id: 'cos.apps.googleusercontent.com',
        callback: this.handleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true
      });
      //@ts-ignore
      google.accounts.id.renderButton(
        //@ts-ignore
        document.getElementById("buttonDiv"),
          {theme: "outline", size: "large"}
      )
      //@ts-ignore
      google.accounts.id.prompt((notification: PromptMomentNotification) => {})
    }

  }

  async handleCredentialResponse(response: CredentialResponse){
    console.log(response)
    this.authService.loginWithGoogle(response.credential).subscribe(
      (x: {token: any}) => {
        console.log("token:   ", x.token);
        this.userService.setUserToken(x.token);
        this.userService.isLogged();
        this.ngZone.run(() => {
          this.router.navigateByUrl('home');
        });
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  login(){
    let user : AuthenticationUserLoginData = this.form.value;
    this.authService.login(user).subscribe(
      (res : {token: any}) => {
        this.userService.setUserToken(res.token);
        this.userService.isLogged();
        this.router.navigateByUrl('home');
      }
    )
  }

}
