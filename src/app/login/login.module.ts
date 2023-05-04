import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { firebaseUIConfig } from './firebaseui-config';
import { LoginRoute } from './login-routing.module';
import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FirebaseUIModule } from 'firebaseui-angular';
import { environment } from 'environments/environment';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";

@NgModule({
    declarations: [
        LoginComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(LoginRoute),
        MatProgressSpinnerModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        FirebaseUIModule.forRoot(firebaseUIConfig),
    ],
    exports: [],
    providers: [],
})
export class LoginModule { }