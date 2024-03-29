import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActiveLinkDirective } from './shared/link.directive';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-nav-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslocoModule,
    ActiveLinkDirective,
  ],
  templateUrl: './nav-list.component.html',
  styleUrl: './nav-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavListComponent {

}
