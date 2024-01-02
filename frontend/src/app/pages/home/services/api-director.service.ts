import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiRoutes } from '@core/constants/api-routes.const';
import { Director } from '@core/interfaces/director';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiDirectorService {
  private http = inject(HttpClient);

  getFilteredDirectors(name: string) : Observable<Director[]> {
    const params = (new HttpParams).append("name", name);

    return this.http.get<Director[]>(`${ApiRoutes.API_BASE_PATH}${ApiRoutes.SEARCH_DIRECTORS_ENDPOINT}`, {params});
  }

  getDirectors() : Observable<Director[]> {
    return this.http.get<Director[]>(`${ApiRoutes.API_BASE_PATH}${ApiRoutes.DIRECTORS_ENDPOINT}`);
  }

  postDirector(director: Director) : Observable<Director> {
    return this.http.post<Director>(`${ApiRoutes.API_BASE_PATH}${ApiRoutes.DIRECTORS_ENDPOINT}`, director)
  }

  putDirector(id: number, director: Director) : Observable<Director> {
    return this.http.put<Director>(`${ApiRoutes.API_BASE_PATH}${ApiRoutes.DIRECTORS_ENDPOINT}` + "/" + id, director)
  }

  deleteDirector(id: number){
    return this.http.delete<Director>(`${ApiRoutes.API_BASE_PATH}${ApiRoutes.DIRECTORS_ENDPOINT}` + "/" + id)
  }
}
