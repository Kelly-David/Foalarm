import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { User } from '../user';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  users$: FirebaseListObservable<User[]>;
  user$: FirebaseObjectObservable<User>;
  user = {} as User;

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {
    this.users$ = db.list('users');
    this.user$ = db.object('user');
  }

  setUser() {
    // If user is empty object - get and set available info
    if (this.user === {}) {
      this.authService.user$.map(
      (user) => {
        if (user && user.uid) {
          this.user.uid = user.uid;
          this.user.email = user.email;
        }
      });
      this.user$.map(
        (user) => {
          if (user && (user.uid === this.user.uid)) {
            this.user.name = user.name;
            this.user.phoneNumber = user.phoneNumber;
            this.user.photoURL = user.photoURL;
          }
        }
      );
    }
  }

  getUser(userKey: string) {
    return this.db.object(`users/${userKey}`)
    .catch(this.errorHandler);
  }

  getUsers() {
    return this.users$
      .catch(this.errorHandler);
  }

  saveUser(user: User) {
    return this.users$.push(user)
    .then(_ => console.log('Success'))
    .catch(error => console.log(error));
  }

  editUser(user: User) {
    return this.users$.update(user.$key, user)
    .then(_ => console.log('Success'))
    .catch(error => console.log(error));
  }

  deleteUser(user: User) {
    return this.users$.remove(user.$key)
    .then(_ => console.log('Success'))
    .catch(error => console.log(error));
  }

  private errorHandler(error) {
    console.log(error);
    return Observable.throw(error);
  }

}
