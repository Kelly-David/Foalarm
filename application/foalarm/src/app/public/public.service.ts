/*
 * File: public.service.ts
 * Project: /Users/david/Foalarm/application/foalarm
 * File Created: Saturday, 31st March 2018 9:51:02 am
 * Author: david
 * -----
 * Last Modified: Thursday, 12th April 2018 7:30:14 pm
 * Modified By: david
 * -----
 * Description: Public Service
 */

import { Injectable } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { Observable } from 'rxjs/Observable';
import { Horse } from '../horse';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { User } from '../user';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';

@Injectable()
export class PublicService {

  private publicHorses$: Observable<Horse[]> | Observable<any> | null;
  private friends: Array<any>;

  constructor(
    private db: FirestoreService,
    private router: Router,
    private auth: AuthService,
    private afs: AngularFirestore

  ) { }

  /**
   * Get observable to horses where isPublic = true
   */
  get publicHorses() {
    return this.db.col$('horses', ref => ref
                    .where('deleted', '==', false)
                    .where('isPublic', '==', true)
                    .orderBy('displayName'));
  }

  /**
   * Returns observable of public horse of specified user uid
   * @param key user uid
   */
  friendsHorses(key: any) {
    return this.db.col$(`horses`, ref => ref
                                        .where('isPublic', '==', true)
                                        .where('ownerUID', '==', key)
                                        .where('deleted', '==', false));
  }

}
