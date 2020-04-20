/**
 * @file
 *
 * Project: mvp-people-management
 *    File: auth.service.js
 *
 * The long description of the file's purpose goes here and describes in detail the complete functionality of the file.
 * This description can span several lines and ends with a period.
 * - Management
 *
 * @class
 * @classdesc This is a description of the MyClass class.
 * @summary   A short description of the file.
 *
 *
 * @license The Unlicense, http://unlicense.org/
 * @author  Orlando Ramos &lt;bhit.omicron@gmail.com&gt;, https://github.com/bhitOmicron/ , [omicron]
 * @updated 16/09/17
 * @link    url goes here
 * @version 0.1
 * @since   1.0.0
 *
 */
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';

import {log} from 'util';

import * as firebase from 'firebase/app';

import {User} from './User';

@Injectable()
export class AuthService {

  authState: any = null;
  private user: User;
  defaultPhotoURL = '../../../../assets/images/user.svg';

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              private router: Router) {
    this.authState = afAuth.authState;
    this.authState
      .subscribe(user => {
        if (user) {
          this.user = this.updateUser(user);
        }
      });
  }

  //// Email/Password Auth ////
  emailLogin(email: string, password: string) {
    console.log('AuthService');
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        return user;
      });
  }

  //// Email/Password Auth ////
  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        return user;
      })
      .catch(error => {
          return error;
        }
      );
  }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this.user : null;
  }


  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const auth = firebase.auth();
    return auth.sendPasswordResetEmail(email)
      .then(() => console.log('resetPassword OK '))
      .catch((error) => console.log(error));
  }

  /// Sign Out
  signOut(): void {
    this.afAuth.auth.signOut()
      .then(value => log(value));
    this.authState = this.afAuth.authState;
    this.router.navigate(['/']);
  }

  private updateUser(user): User {
    // Sets user data to firestore on login

    if (user.providerData.photoURL == null) {
      user.providerData.photoURL = this.defaultPhotoURL;
    }
    return user;
  }
}
