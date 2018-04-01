import { Injectable } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  users$: Observable<{}[]> | Observable<any>;
  friends$: Observable<{}[]> | Observable<any> | null;

  constructor(
    private db: FirestoreService
  ) {
    this.users$ = this.db.col$('users');
  }

  getUser(key) {
    return this.db.doc$(`users/${key}`);
  }

  public users(uid?: boolean) {
    console.log(uid);
    return !uid ? this.db.col$('users') : this.db.col$(`users/${uid}/friends`);
  }

}
