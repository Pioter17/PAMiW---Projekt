import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRoutes } from '@core/constants/api-routes.const';
import { Observable, catchError, map, of } from 'rxjs';
import { Api } from '../enums/api.enum';
import { AuthenticationResponse } from '../interfaces/authentication-response';
import { AuthenticationUserLoginData, AuthenticationUserRegisterData } from '../interfaces/authentication-user-data';

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }

  register(registerData: AuthenticationUserRegisterData): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${ApiRoutes.API_BASE_PATH}${Api.REGISTER}`, registerData).pipe(
      catchError(() => of({ token: "" })),
    )
  }

  login(loginData: AuthenticationUserLoginData): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${ApiRoutes.API_BASE_PATH}${Api.LOGIN}`, loginData).pipe(
      catchError(() => of({ token: "" })),
    )
  }

  loginWithGoogle(credential: string) : Observable<AuthenticationResponse>{

    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<AuthenticationResponse>(`${ApiRoutes.API_BASE_PATH}${Api.GOOGLE}`, JSON.stringify(credential), {headers: header}).pipe(
      catchError(() => of({ token: "" })),
    )
  }

  logout(): Observable<boolean> {
    return this.http.post<unknown>(`${ApiRoutes.API_BASE_PATH}${Api.LOGOUT}`, {}).pipe(
      map(() => true),
      catchError(() => of(false)),
    )
  }
}
