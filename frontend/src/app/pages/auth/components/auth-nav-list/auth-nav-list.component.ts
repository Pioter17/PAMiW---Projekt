import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { ActiveLinkDirective } from '@pages/home/components/nav-list/shared/link.directive';

@Component({
  selector: 'app-auth-nav-list',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoModule,
    RouterModule,
    ActiveLinkDirective
  ],
  templateUrl: './auth-nav-list.component.html',
  styleUrl: './auth-nav-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthNavListComponent { }
