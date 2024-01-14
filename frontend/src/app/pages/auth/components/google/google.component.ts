import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GoogleApiService } from '@core/services/google-api.service';
import { OAuthModule } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-google',
  standalone: true,
  imports: [
    CommonModule,
    OAuthModule
  ],
  templateUrl: './google.component.html',
  styleUrl: './google.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoogleComponent {

  private service = inject(GoogleApiService);


}
