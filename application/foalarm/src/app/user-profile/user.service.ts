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

  public getUser(key) {
    return this.db.doc$(`users/${key}`);
  }

  public users(uid?: boolean) {
    console.log(uid);
    return !uid ? this.db.col$('users') : this.db.col$(`users/${uid}/friends`);
  }

  public addFriend(user: String, data: any, key?: string) {
    return this.db.set(`users/${user}/friends`, data, key)
    .catch(error => console.log(error));
  }

}
