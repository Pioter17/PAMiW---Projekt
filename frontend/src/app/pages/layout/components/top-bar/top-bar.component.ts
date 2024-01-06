import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeChangerService } from '@core/services/theme-changer.service';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { isNumberObject } from 'util/types';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoModule
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent { 
  name = "Piotrek";
  lightMode = true;

  translocoService = inject(TranslocoService);
  themeChangerService = inject(ThemeChangerService);

  changeLanguage() {
    this.translocoService.setActiveLang(this.translocoService.getActiveLang() == "pl" ? "en" : "pl");
  }

  changeTheme() {
    this.themeChangerService.changeTheme();
  }
}
