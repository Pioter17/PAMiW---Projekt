import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { isEmpty } from 'lodash';
import { KeyStorage } from '../enums/key-storage.enum';
import { LocalStorageService } from '../services/local-storage.service';
import { BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { User } from '@core/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userToken: string;
  private status = new BehaviorSubject<boolean>(false);
  private role = new BehaviorSubject<string>("");

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
  ) { }

  setUserToken(token: string): void {
    this.localStorageService.setItem(KeyStorage.USER_AUTHENTICATION_TOKEN, token);
    this.status.next(true);
    this.role.next(this.getUserData().roles[0].authority);
  }

  getUserToken(): string {
    return this.localStorageService.getItem<string>(KeyStorage.USER_AUTHENTICATION_TOKEN);
  }

  isAuthenticated(): boolean {
    return !isEmpty(this.getUserToken());
  }

  isLogged(){
    this.status.next(this.isAuthenticated() ? true : false);
    return this.status.asObservable();
  }

  logout(): void {
    this.status.next(false);
    this.clearAll();
  }

  getUserData(): User | null{
      let tokenDecrypted = this.getDecodedAccessToken(this.getUserToken());
      return tokenDecrypted;
  }

  getRole(){
    return this.role.asObservable();
  }

  private getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch(Error) {
      return null;
    }
  }

  private clearAll(): void {
    this.localStorageService.clear();
    void this.router.navigateByUrl('auth/login');
  }
}
