import { Injectable } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../core/auth.service';

@Injectable()
export class UserService {

  users$: Observable<{}[]> | Observable<any>;
  friends$: Observable<{}[]> | Observable<any> | null;

  constructor(
    private db: FirestoreService,
    private auth: AuthService
  ) {
    this.users$ = this.db.col$('users');
  }

  /**
   * Returns observable to user ref
   * @param key the user ref uid
   */
  public getUser(key: string) {
    return this.db.doc$(`users/${key}`);
  }

  /**
   * Returns observable to user ref from auth user's friends collection
   * @param key the user ref uid
   */
  public getFriend(key: string) {
    return this.db.doc$(`users/${this.auth.uString}/friends/${key}`);
  }

  /**
   * Sets user ref (key) property: deleted = true in auth user's friends collection
   * Then (callback) set auth user ref property deleted = true friend's friends collection
   * @param key the user (friend) to remove
   */
  public removeUserFromFriendList(key: string) {
    return this.db.delete(`users/${this.auth.uString}/friends`, key)
    .then(_ => {
      this.db.delete(`users/${key}/friends`, this.auth.uString);
    });
  }

  /**
   * Returns observable of users collection or auth user's friends
   * @param uid
   */
  public users(uid?: string) {
    return !uid ? this.db.col$('users') : this.db.col$(`users/${uid}/friends`, ref => ref.where('deleted', '==', false));
  }

  /**
   * Returns an observables of auth user's friends
   */
  public friends() {
    return this.db.col$(`users/${this.auth.uString}/friends`, ref => ref.where('deleted', '==', false));
  }

  /**
   * Returns obsevable of auth user's friends requests
   */
  public requests() {
    return this.db.col$(`users/${this.auth.uString}/friendrequests`, ref => ref.where('deleted', '==', false));
  }

  /**
   * Approves a friends request
   * @param data
   * @param key
   */
  public addFriend(data: any, key?: string) {
    return this.db.set(`users/${this.auth.uString}/friends`, data, key)
    .then(_ =>
      this.removeUserFromFriendRequestList(key))
    .then(_ =>
      this.addUserToRequestedFriendsFriendsList(key, data))
    .catch(error => console.log(error));
  }

  /**
   * Adds a user to user's friendrequests collection
   * @param user the user to requesting the action
   * @param data
   * @param key the UID of the requested friend
   */
  public requestFriend(user: string, data: any, key?: string) {
    return this.db.set(`users/${user}/friendrequests`, data, key)
      .catch(error => console.log(error));
  }

  /**
   * Set user property: deleted = true in auth user's friendrequests collection
   * @param key the user ref uid
   */
  private removeUserFromFriendRequestList(key: string) {
    return this.db.delete(`users/${this.auth.uString}/friendrequests`, key);
  }

  /**
   * Add the auth user to a user's (key is uid) friendrequest collection
   * @param key
   * @param data
   */
  private addUserToRequestedFriendsFriendsList(key: string, data: any) {
    return this.db.set(`users/${key}/friends`, {uid: this.auth.uString}, this.auth.uString);
  }

}
