import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'app/global-types';
import { FirebaseUISignInFailure, FirebaseUISignInSuccessWithAuthResult } from 'firebaseui-angular';
import { LoginAction } from "app/store/actions/auth.actions";
import { AppState, selectAuthState } from "app/store/app.state";
import { Observable } from 'rxjs';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoadingFirebaseUI: boolean = true;
  error: string;
  getState: Observable<any>;

  constructor(
    private store: Store<AppState>
  ) { 
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit(): void { }

  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
    // add user to global state
    const user: User = {
      username: signInSuccessData.authResult.user.displayName,
      email: signInSuccessData.authResult.user.email
    }
    this.store.dispatch(new LoginAction(user));
  }

  errorCallback(errorData: FirebaseUISignInFailure) {
    console.error(errorData);
    this.error = errorData.code;
  }

  uiShownCallback() {
    this.isLoadingFirebaseUI = false;
  }
}
