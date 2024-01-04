import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeChangerService {
  private theme = new BehaviorSubject<string>('light');
  
  changeTheme() {
    this.theme.next(this.theme.getValue() == "light" ? "dark" : "light");
  }

  getTheme() {
    return this.theme.asObservable();
  }

}
