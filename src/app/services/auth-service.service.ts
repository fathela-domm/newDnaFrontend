import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from 'app/store/app.state';
import { } from 'express';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'any'
})
export class AuthService {
  getState$: Observable<any>;
  result: boolean = false;
  constructor(private router: Router, private store: Store<AppState>, private storage: LocalStorageService) {
    this.getState$ = this.store.select(selectAuthState);
  }

  getAuthStatus(): boolean {
    this.getState$.subscribe((state: any) => {
      if (state.isAuthenticated && state.user || this.storage.get('user')) {
        this.result = true;
      } else {
        this.result = false;
      }
    });
    return this.result;
  }
}
