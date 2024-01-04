import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';

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

  translocoService = inject(TranslocoService);

  changeLanguage() {
    this.translocoService.getActiveLang()
    if (this.translocoService.getActiveLang() == "pl")
    {
      this.translocoService.setActiveLang("en");
    } else {
      this.translocoService.setActiveLang("pl");
    }
  }
}
