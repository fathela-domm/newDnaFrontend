import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'any'
})
export class LocalStorageService {
  constructor() { }

  push(key: string, data: any) {
    return localStorage.setItem(key, JSON.stringify(data))
  }

  get(key: string) {
    return localStorage.getItem(key)
  }

  remove(key: string) {
    return localStorage.removeItem(key);
  }

  removeAll() {
    return localStorage.clear();
  }
}
