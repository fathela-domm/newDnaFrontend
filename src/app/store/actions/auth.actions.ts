import { Action } from '@ngrx/store';

export enum AuthActionTypes {
    LOGIN = '[Auth] Login',
    LOGIN_SUCCESS = '[Auth] Login Success',
    LOGOUT = '[Auth] Logout'
}

export class LoginAction implements Action {
    readonly type = AuthActionTypes.LOGIN;
    constructor(public payload: any) { }
}

export class LogInSuccess implements Action {
    readonly type = AuthActionTypes.LOGIN_SUCCESS;
    constructor(public payload: any) { }
}

export class LogOutAction implements Action {
    readonly type = AuthActionTypes.LOGOUT;
}

export type All =
    | LoginAction
    | LogInSuccess
    | LogOutAction