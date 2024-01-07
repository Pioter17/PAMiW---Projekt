import { Injectable } from '@angular/core';

import { KeyStorage } from '../enums/key-storage.enum';
import { Nullable } from '../interfaces/nullable';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public setItem<T>(key: KeyStorage, value: T): void {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  public getItem<T>(key: KeyStorage): T {
    const retrievedObject = window.localStorage.getItem(key);

    if (retrievedObject === null) {
      return {} as T;
    }

    return JSON.parse(retrievedObject) as T;

  }

  public removeItem(key: KeyStorage): void {
    window.localStorage.removeItem(key);
  }

  public clear(): void {
    console.log("locoal storage clear")
    window.localStorage.clear();
  }

  public key(index: number): Nullable<string> {
    return window.localStorage.key(index);
  }

}