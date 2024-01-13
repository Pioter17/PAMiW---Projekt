import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { PathRoutes } from '@core/constants/routes.const';
import { Movie } from '@core/interfaces/movie';
import { UserService } from '@core/services/user.service';
import { TranslocoModule } from '@ngneat/transloco';
import { ApiMovieService } from '@pages/home/services/api-movie.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-display-movies',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule,
    TranslocoModule
  ],
  providers: [
    ApiMovieService
  ],
  templateUrl: './display-movies.component.html',
  styleUrl: './display-movies.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayMoviesComponent implements OnInit{
  show = false;
  filtered = false;
  movies: Movie[] = [];
  search: string;
  page: number;
  allPages: number = 4;
  role: Observable<string>;

  private api = inject(ApiMovieService);
  private router = inject(Router);
  private userService = inject(UserService);

  ngOnInit(): void {
    this.page = 1;
    this.getMovies();
    this.role = this.userService.getRole();
  }

  getMovies(){
    this.search = "";
    this.movies = [];
    this.filtered = false;
    this.api.getMovies(this.page - 1).subscribe((res) => {
      res.content.forEach((elem) => {
        this.movies.push(elem);
      });
      this.allPages = res.totalPages;
    })
  }

  getFilteredMovies(){
    this.movies = [];
    this.filtered = true;
    this.page = 1;
    this.api.getFilteredMovies(this.search).subscribe((res) => {
      res.content.forEach((elem) => {
        this.movies.push(elem);
      });
      this.allPages = res.totalPages;
    })
  }

  getPreviousMovies(){
    this.page -= 1;
    this.getMovies();
  }

  getNextMovies(){
    this.page += 1;
    this.getMovies();
  }

  addMovie(){
    this.router.navigateByUrl(`${PathRoutes.HOME}/${PathRoutes.ADD}/`);
  }

  updateMovie(id: number){
    this.router.navigateByUrl(`${PathRoutes.HOME}/${PathRoutes.ADD}/${id}`);
  }

  deleteMovie(id: number, index: number){
    this.api.deleteMovie(id).subscribe(
      (response) => {
        console.log('Film został usunięty');
      },);
      this.movies.splice(index, 1);
  }
}
