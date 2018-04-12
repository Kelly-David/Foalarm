/*
 * File: app.component.ts
 * Project: /Users/david/Foalarm/application/foalarm
 * File Created: Thursday, 14th October 2017 11:25:45 am
 * Author: david
 * -----
 * Last Modified: Thursday, 12th April 2018 7:53:30 pm
 * Modified By: david
 * -----
 * Description: Main Entry Component
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
  title = 'Foalarm';
  items: Observable<any[]>;
  user: Observable<User>;

  constructor(db: AngularFirestore, public authService: AuthService) {
    this.items = db.collection('items').valueChanges();
    this.user = authService.user;
  }
}
