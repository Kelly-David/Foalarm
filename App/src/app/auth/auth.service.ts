/*
 * @Author: David Kelly
 * @Date: 2017-10-26 14:58:52
 * @Last Modified time: 2017-10-26 14:58:52
 */
import * as firebase from 'firebase/app';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AlertHandlerService } from '../alert-handler.service';
import { User } from '../user';

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;
  adminUID = '1cwDRlKbIVZOycojYbsStTOd5p03' as string;
  public user = {} as User;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private alertHandler: AlertHandlerService
  ) {
    this.user$ = this.afAuth.authState;
  }
  // Function determines the method or Firebase Authentication
  login(userEmail?: string, userPassword?: string) {
    if (userEmail && userPassword) {
      this.loginWithUserNameAndPassword(userEmail, userPassword);
    } else {
      this.loginWithGoogle();
    }
  }
  // Firebase User Authentication using Google
  loginWithGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(_ =>
      this.router.navigate(['/company-list']))
    .catch(error =>
      console.log('Google authentication error: ' + error));
  }

  // Firebase User Authentication using Email and Password
  loginWithUserNameAndPassword(userEmail, userPassword) {
    this.afAuth.auth.signInWithEmailAndPassword(userEmail, userPassword)
    .then(_ =>
      // TODO remove
      this.alertHandler.authenticationSuccessAlert('Success'))
    .then(_ => this.router.navigate(['/company-list']))
    .catch(error =>
      this.alertHandler.authenticationErrorAlert(error));
  }

  // Firebase user registration with email and password
  registerWithUserNameAndPassword(user: User) {
    console.log(user);
  }

  // Logout function
  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }

  private setCurrentUser() {
    this.user$.map(user => {
      if (user && user.uid) {
        this.user.name = user.displayName;
        this.user.email = user.email;
        this.user.uid = user.uid;
        this.user.phoneNumber = user.phoneNumber;
        this.user.photoURL = user.photoURL;
        console.log(user.uid);
      }
    });
  }

}
