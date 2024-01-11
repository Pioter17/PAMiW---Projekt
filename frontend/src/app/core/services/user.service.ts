import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { isEmpty } from 'lodash';
import { KeyStorage } from '../enums/key-storage.enum';
import { LocalStorageService } from '../services/local-storage.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userToken: string;
  private status = new BehaviorSubject<boolean>(false);

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
  ) { }

  setUserToken(token: string): void {
    this.localStorageService.setItem(KeyStorage.USER_AUTHENTICATION_TOKEN, token);
    this.status.next(true);
  }

  getUserToken(): string {
    return this.localStorageService.getItem<string>(KeyStorage.USER_AUTHENTICATION_TOKEN);
  }

  isAuthenticated(): boolean {
    return !isEmpty(this.getUserToken());
  }

  isLogged(){
    return this.status.asObservable();
  }

  logout(): void {
    this.status.next(false);
    this.clearAll();
  }

  // isTokenExpired(): boolean {
  //   const { expires_at } = this.user();

  //   return isAfter(new Date(), new Date(expires_at));
  // }

  // private user(): string {
  //   return this.localStorageService.getItem<string>(KeyStorage.USER_AUTHENTICATION_TOKEN);
  // }

  private clearAll(): void {
    this.localStorageService.clear();
    void this.router.navigateByUrl('auth/login');
  }
}
