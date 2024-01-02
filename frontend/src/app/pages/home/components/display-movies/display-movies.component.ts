import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Movie } from '@core/interfaces/movie';
import { ApiMovieService } from '@pages/home/services/api-movie.service';
import { Observable, filter } from 'rxjs';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-display-movies',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    ApiMovieService
  ],
  templateUrl: './display-movies.component.html',
  styleUrl: './display-movies.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayMoviesComponent { 
  show = false;
  filtered = false;
  movies: Movie[] = [];//Observable<Movie[]>;
  displayedMovies: Movie[] = [];
  search: string;

  private dialog = inject(MatDialog);

  api = inject(ApiMovieService);

  showMovies(){
    this.show = true;
  }

  hideMovies(){
    this.show = false;
    this.movies = [];
    this.displayedMovies = [];
  }

  getMovies(){
    this.filtered = false;
    this.api.getMovies().subscribe((res) => {
      res.forEach((elem) => {
        this.movies.push(elem);
      })
      for(let i=0; i<10;i++){
        this.displayedMovies.push(this.movies[i])
      }
    })
    this.showMovies();
  }

  getFilteredMovies(){    
    this.movies = [];
    this.displayedMovies = [];
    this.filtered = true;
    this.api.getFilteredMovies(this.search).subscribe((res) => {
      res.forEach((elem) => {
        this.movies.push(elem);
      })
      for(let i=0; i<10;i++){
        console.log(this.movies[i])
        this.displayedMovies.push(this.movies[i])
      }
    })
  }

  addMovie(){
    // const dialogRef = this.dialog.open(AddMovieDialogComponent, {
    //   minWidth: '400px',
    //   minHeight: '300px',
    // });

    // dialogRef.afterClosed().pipe(
    //   filter((res) => !!res),
    // ).subscribe((res) => {
    //   this.api.postMovie(res).subscribe(
    //     (response) => {
    //       let newMovie: Movie = response.data;
    //       this.movies.push(newMovie);
    //       console.log('Film został dodany');
    //     },);
    // });
  }

  updateMovie(id: number, index: number){
    // const dialogRef = this.dialog.open(AddMovieDialogComponent, {
    //   minWidth: '400px',
    //   minHeight: '300px',
    //   data:{
    //     ...this.movies[index],
    //     isEdit: true,
    //   }
    // });

    // dialogRef.afterClosed().pipe(
    //   filter((res) => !!res),
    // ).subscribe((res) => {
    //   this.api.putMovie(id, res).subscribe(
    //     (response : MovieResponse) => {
    //       let newMovie: Movie = response.data;
    //       console.log(newMovie)
    //       this.displayedMovies[index] = newMovie;
    //       console.log('Film został zedytowany');
    //     }
    //   )
    // });
  }

  deleteMovie(id: number, index: number){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      minWidth: '200px',
      minHeight: '100px',
    });

    dialogRef.afterClosed().pipe(
      filter((res) => !!res),
    ).subscribe(() => {
      this.api.deleteMovie(id).subscribe(
        (response) => {
          console.log('Film został usunięty');
        },);
        this.displayedMovies.splice(index, 1);
    });
    
  }
}
