import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabase, AngularFireDatabaseModule} from '@angular/fire/database';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {environment} from '../environments/environment';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {MaterialModule} from './shared/modules/app.material.module';
import {AuthService} from './shared/services/authentication/auth.service';
import {AuthGuard} from './shared/services/authentication/authguard.service';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase, 'mvp-people-management'),
    MaterialModule,
    AngularFireDatabaseModule, // imports all the firebase DB features.
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    FormsModule
  ],
  providers: [AngularFireDatabase,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2800}},
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
