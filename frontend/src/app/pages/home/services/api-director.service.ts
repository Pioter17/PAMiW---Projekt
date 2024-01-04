import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiRoutes } from '@core/constants/api-routes.const';
import { Director, DirectorPaginationResponse } from '@core/interfaces/director';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiDirectorService {
  private http = inject(HttpClient);

  getAllDirectors() : Observable<Director[]> {
    return this.http.get<Director[]>(`${ApiRoutes.API_BASE_PATH}${ApiRoutes.ALL_DIRECTORS_ENDPOINT}`);
  }

  getDirectors(page: number = 0, size: number = 10): Observable<DirectorPaginationResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<DirectorPaginationResponse>(`${ApiRoutes.API_BASE_PATH}${ApiRoutes.DIRECTORS_ENDPOINT}`, { params });
  }

  getFilteredDirectors(name: string, page: number = 0, size: number = 10): Observable<DirectorPaginationResponse> {
    const params = { name, page, size };
  
    return this.http.get<DirectorPaginationResponse>(`${ApiRoutes.API_BASE_PATH}${ApiRoutes.SEARCH_DIRECTORS_ENDPOINT}`, { params });
  }
}
