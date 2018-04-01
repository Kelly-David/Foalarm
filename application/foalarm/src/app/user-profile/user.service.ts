import { Injectable } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  constructor(
    private db: FirestoreService
  ) { }

  getUser(key) {
    return this.db.doc$(`users/${key}`);
  }

  get allUsers() {
    return this.db.col$('users');
  }

}
