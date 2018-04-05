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

  get publicHorses() {
    return this.db.col$('horses', ref => ref
                    .where('deleted', '==', false)
                    .where('isPublic', '==', true)
                    .orderBy('displayName'));
  }

  get firendsPublicHorses() {
    return this.db.col$(`users/${this.auth.uString}/friends`, ref => ref.where('deleted', '==', false)).forEach(col => {
      col.forEach(doc => {
        const data = new Object(doc);
        console.log(data);
      });
    });
  }

  friendsHorses() {
    return null;
  }

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
