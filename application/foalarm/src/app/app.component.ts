/*
 * @Author: David Kelly
 * @Date: 2017-10-26 14:58:28
 * @Last Modified time: 2017-10-26 14:58:28
 */

import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './core/auth.service';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  items: Observable<any[]>;
  user: Observable<User>;

  constructor(db: AngularFirestore, public authService: AuthService) {
    this.items = db.collection('items').valueChanges();
    this.user = authService.user;
  }
}
