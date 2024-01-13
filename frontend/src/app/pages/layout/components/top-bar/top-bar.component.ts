import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { ThemeChangerService } from '@core/services/theme-changer.service';
import { UserService } from '@core/services/user.service';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { isNumberObject } from 'util/types';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoModule,
  ],
  providers: [
    AuthService
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent implements OnInit {
  role: Observable<string>;
  lightMode = true;
  isUserLogged: Observable<boolean>;


  translocoService = inject(TranslocoService);
  themeChangerService = inject(ThemeChangerService);
  authService = inject(AuthService);
  userService = inject(UserService);

  ngOnInit(): void {
    this.isUserLogged = this.userService.isLogged();
    this.role = this.userService.getRole();
  }

  changeLanguage() {
    this.translocoService.setActiveLang(this.translocoService.getActiveLang() == "pl" ? "en" : "pl");
  }

  changeTheme() {
    this.themeChangerService.changeTheme();
  }

  logout() {
    this.authService.logout().subscribe(()=>{
      this.userService.logout();
    })
  }
}
