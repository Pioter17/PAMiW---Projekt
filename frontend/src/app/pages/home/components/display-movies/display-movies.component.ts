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
import { ApiMovieService } from '@pages/home/services/api-movie.service';

@Component({
  selector: 'app-display-movies',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule
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

  private dialog = inject(MatDialog);
  private api = inject(ApiMovieService);
  private router = inject(Router);

  ngOnInit(): void {
    this.page = 1;
    this.getMovies();
  }

  showMovies(){
    this.show = true;
  }

  hideMovies(){
    this.show = false;
    this.movies = [];
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
    this.showMovies();
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
