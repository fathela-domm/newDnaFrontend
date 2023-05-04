import { Router } from '@angular/router';
import { LoginAction, LogInSuccess } from 'app/store/actions/auth.actions';
import { tap } from 'rxjs/operators';
import { AuthActionTypes } from './../actions/auth.actions';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {  map, Observable } from 'rxjs';
import { LocalStorageService } from 'app/services/local-storage.service';

@Injectable({
    providedIn: 'any'
})
export class AuthEffect {
    constructor(
        private actions$: Actions,
        private localStorage: LocalStorageService,
        private router: Router,
    ) { }

    loginUser$ = createEffect(() => this.actions$.pipe(
        ofType(AuthActionTypes.LOGIN),
        map((action: LoginAction) => action.payload),
        map((payload) => {
            return new LogInSuccess({ username: payload.username, email: payload.email })
        })
    ));

    public loginSuccess$: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType(AuthActionTypes.LOGIN_SUCCESS),
        tap((user) => {
            this.localStorage.push('user', user);
            this.router.navigateByUrl('/home');
        })
    ), { dispatch: false });

    public logOut$: Observable<any> = createEffect(() => this.actions$.pipe(
        ofType(AuthActionTypes.LOGOUT),
        tap((user) => {
            this.localStorage.remove('user');
            this.router.navigateByUrl('/login');
        })
    ), { dispatch: false });
}