/*
 * File: auth.service.ts
 * Project: /Users/david/Foalarm/application/foalarm
 * File Created: Thursday, 14th December 2017 2:56:20 pm
 * Author: david
 * -----
 * Last Modified: Thursday, 12th April 2018 2:53:47 pm
 * Modified By: david
 * -----
 * Description: Authentication Service
 */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { User } from '../user';
import { empty } from 'rxjs/Observer';
import { AlertHandlerService } from '../alert-handler.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {

  public user: Observable<User>;
  public userIdString = new Subject<string>();
  public userId$ = this.userIdString.asObservable();
  public uString: string;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private alert: AlertHandlerService
  ) {

    // Define the User variable
    this.user = this.afAuth.authState
      .switchMap(user => {
        if (user) {
          this.userIdString.next(user.uid);
          this.uString = user.uid;
          // Logged in: get user data
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return Observable.of(null);
        }
      });
  }

  /**
   * Login with email and password
   * @param email
   * @param password
   */
  public login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(user => {
        this.getUserData(user);
      })
      .then(_ => this.router.navigate(['/profile']))
      .catch(error => this.alertError(error));
  }

  /**
   * Create a user using email and password
   * @param email
   * @param password
   */
  public register(email: string, password: string) {
    // return this.alertError('Registration is disabled by admin');
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        // Create a user in Firestore
        return this.setUserData(user);
      })
      .catch(error => this.alertError(error));
  }

  /**
   * Returns a reference to the user data
   * @param user
   */
  private getUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    return userRef.valueChanges;
  }

  /**
   * Set user data
   * Creates a new user document in firestore returns a reference to the user
   * @param user
   */
  private setUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    // Set uid and email
    const data: User = {
      uid: user.uid,
      email: user.email,
    };
    return userRef.set(data);
  }

  /**
   * Update user document with additional data
   * @param user
   * @param data
   */
  public updateUserData(user: User, data: any) {
    // Update User doc with additional data
    return this.afs.doc(`users/${user.uid}`).update(data)
      .then(_ => this.router.navigate(['/profile']));
  }

  /**
   * If theres an error, alert the user
   * @param error
   */
  private alertError(error) {
    console.log(error);
    this.alert.registrationErrorAlert(error);
  }

  /**
   * Logout
   */
  public signOut() {
    return this.afAuth.auth.signOut()
    .then(() => {
      this.router.navigate(['/login']);
    })
    .then(() => {
      // Force a refresh to unsubscribe
      this.refresh();
    });
  }

  /**
   * Refresh the window
   */
  private refresh(): void {
    window.location.reload();
  }

}
