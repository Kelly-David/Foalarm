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
   * Friends public horses
   * TODO - flatten horse queries into one
   */
  get firendsPublicHorses() {
    return this.db.col$(`users/${this.auth.uString}/friends`, ref => ref.where('deleted', '==', false)).forEach(col => {
      col.forEach(doc => {
        const data = new Object(doc);
        console.log(data);
      });
    });
  }

  // Returns observable of public horse of specified user uid
  friendsHorses(key: any) {
    return this.db.col$(`horses`, ref => ref
                                        .where('isPublic', '==', true)
                                        .where('ownerUID', '==', key)
                                        .where('deleted', '==', false));
  }

  /**
   * TODO - test and remove
   */
  friendsHorses2() {
    return this.afs
      .collection(`users/${this.auth.uString}/friends`)
      .snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          console.log(a.payload.doc.id);
        });

      });
  }

}
