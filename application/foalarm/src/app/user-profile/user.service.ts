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

  public getUser(key: string) {
    return this.db.doc$(`users/${key}`);
  }

  public getFriend(key: string) {
    return this.db.doc$(`users/${this.auth.uString}/friends/${key}`);
  }

  public removeUserFromFriendList(key: string) {
    return this.db.delete(`users/${this.auth.uString}/friends`, key);
  }

  public users(uid?: string) {
    console.log(uid);
    return !uid ? this.db.col$('users') : this.db.col$(`users/${uid}/friends`, ref => ref.where('deleted', '==', false));
  }

  public friends() {
    return this.db.col$(`users/${this.auth.uString}/friends`, ref => ref.where('deleted', '==', false));
  }

  public addFriend(user: String, data: any, key?: string) {
    return this.db.set(`users/${user}/friends`, data, key)
    .catch(error => console.log(error));
  }

  /**
   * Adds a user to user's friendrequests collection
   * @param user the user to requesting the action
   * @param data
   * @param key the UID of the requested friend
   */
  public requestFriend(user: String, data: any, key?: string) {
    return this.db.set(`users/${user}/friendrequests`, data, key)
      .catch(error => console.log(error));
  }

}
