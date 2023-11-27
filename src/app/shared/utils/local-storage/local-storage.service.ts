import { Injectable } from '@angular/core';

import { ILocalStorage } from './local-storage.interface';
import { encryptLocalStorage } from './encrypt-local-storage';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService implements ILocalStorage {
  constructor() {}

  get<T>(key: string): T {
    const data = encryptLocalStorage.getItem(key);

    return data as T;
  }

  set<T>(key: string, value: T): void {
    encryptLocalStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string): void {
    encryptLocalStorage.removeItem(key);
  }
}
