import { Injectable } from '@angular/core';

import { ILocalStorage } from './local-storage.interface';
import { encryptLocalStorage } from './encrypt-local-storage';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService implements ILocalStorage {
  constructor() {}

  public get<T>(key: string): T {
    const data = encryptLocalStorage.getItem(key);

    return data as T;
  }

  public set<T>(key: string, value: T): void {
    encryptLocalStorage.setItem(key, JSON.stringify(value));
  }

  public remove(key: string): void {
    encryptLocalStorage.removeItem(key);
  }
}
