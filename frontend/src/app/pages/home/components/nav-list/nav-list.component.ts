import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActiveLinkDirective } from './shared/link.directive';

@Component({
  selector: 'app-nav-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ActiveLinkDirective
  ],
  templateUrl: './nav-list.component.html',
  styleUrl: './nav-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavListComponent {

}
