import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { User } from '../user';
import { empty } from 'rxjs/Observer';
import { AlertHandlerService } from '../alert-handler.service';
import { Horse } from '../horse';
import { FirestoreService } from '../firestore.service';
import { AuthService } from '../core/auth.service';
import { firestore } from 'firebase/app';

@Injectable()
export class HorseService {
  horses$: Observable<Horse[]>;
  activeHorses$: Observable<Horse[]>;
  horseCollection: AngularFirestoreCollection<Horse>;

  constructor(
    private db: FirestoreService,
    private afs: AngularFirestore,
    private alert: AlertHandlerService,
    private router: Router,
    private authService: AuthService
  ) {
    // Define the Horse variable
    this.horses$ = this.db.col$('horses');

    // TODO test and remove
    // this.horseCollection = this.afs.collection<Horse>('horses', ref => {
    //   return ref.where('state', '==', true);
    // });
    // this.activeHorses$ = this.horseCollection.valueChanges();

    this.activeHorses$ = this.db.col$('horses', ref => ref.where('state', '==', true));
  }

  // Get horses
  getHorses() {
    return this.horses$;
  }

  // Get active horses
  getActiveHorses() {
    return this.activeHorses$;
  }

  // Get a horse instance
  getHorse(key: any) {
    // return this.afs.doc<User>(`horses/${key}`).valueChanges();
    return this.db.doc$(`horses/${key}`);
  }

  saveHorse(horse: Horse) {

  }

  updateHorseData(user: User, horseKey, data: any) {
    // Update the horse document with additional data
    console.log(horseKey);
    return this.afs.doc(`horses/${horseKey}`).update(data)
      .then(_ => this.router.navigate(['/profile'])).catch(error => console.log(error));
  }

  saveHorseData(user: User, horseKey, data: any) {
    console.log(horseKey);
    return this.setHorse(data)
      //  this.afs.collection(`horses`).add(data)
      .then(_ => this.router.navigate(['/profile'])).catch(error => console.log(error));
  }

  setHorse(data: any) {
    console.log('Saving new horse');
    return this.db.set('horses', data);
  }


}
