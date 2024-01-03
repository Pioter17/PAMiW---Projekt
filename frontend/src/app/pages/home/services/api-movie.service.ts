import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiRoutes } from '@core/constants/api-routes.const';
import { Movie, MovieDTO, MoviePaginationResponse, MovieResponse } from '@core/interfaces/movie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiMovieService {
  private http = inject(HttpClient);

  getFilteredMovies(name: string, page: number = 0, size: number = 10): Observable<MoviePaginationResponse> {
    const params = { name, page, size };
  
    return this.http.get<MoviePaginationResponse>(`${ApiRoutes.API_BASE_PATH}${ApiRoutes.SEARCH_MOVIES_ENDPOINT}`, { params });
  }
  
  getMovies(page: number = 0, size: number = 10): Observable<MoviePaginationResponse> {
    const params = { page, size };
  
    return this.http.get<MoviePaginationResponse>(`${ApiRoutes.API_BASE_PATH}${ApiRoutes.MOVIES_ENDPOINT}`, { params });
  }

  getMovieById(movieId: number): Observable<Movie> {
    return this.http.get<Movie>(`${ApiRoutes.API_BASE_PATH}${ApiRoutes.MOVIES_ENDPOINT}/${movieId}`);
  }

  postMovie(movie: MovieDTO) : Observable<MovieResponse> {
    return this.http.post<MovieResponse>(`${ApiRoutes.API_BASE_PATH}${ApiRoutes.MOVIES_ENDPOINT}`, movie)
  }

  putMovie(id: number, movie: MovieDTO) : Observable<MovieResponse> {
    return this.http.put<MovieResponse>(`${ApiRoutes.API_BASE_PATH}${ApiRoutes.MOVIES_ENDPOINT}` + "/" + id, movie)
  }

  deleteMovie(id: number){
    return this.http.delete<Movie>(`${ApiRoutes.API_BASE_PATH}${ApiRoutes.MOVIES_ENDPOINT}` + "/" + id)
  }

}
