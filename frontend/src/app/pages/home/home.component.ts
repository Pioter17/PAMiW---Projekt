import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DisplayDirectorsComponent } from './components/display-directors/display-directors.component';
import { DisplayMoviesComponent } from './components/display-movies/display-movies.component';
import { NavListComponent } from './components/nav-list/nav-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavListComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {

}
