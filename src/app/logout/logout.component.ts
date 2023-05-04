import { FirebaseService } from './../services/firebase.service';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'app/store/app.state';
import { LogOutAction } from "app/store/actions/auth.actions";

@Component({
  selector: 'logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit, OnDestroy {
  loading: boolean = true;
  constructor(private store: Store<AppState>, private firebaseService: FirebaseService) {
    this.firebaseService.signOut()
      .then((res: any) => {
        this.store.dispatch(new LogOutAction);
      })
      .catch((err: any) => console.error(err));
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.loading = false;
  }
  ngOnInit(): void { }
}