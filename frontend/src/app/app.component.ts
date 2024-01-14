import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ThemeChangerService } from '@core/services/theme-changer.service';
import { Observable } from 'rxjs';
import { LayoutComponent } from '@pages/layout/layout.component';
import { OAuthModule } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    LayoutComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  theme: Observable<string>;
  themeChangerService = inject(ThemeChangerService);

  ngOnInit(): void {
    this.theme = this.themeChangerService.getTheme();
  }
}
