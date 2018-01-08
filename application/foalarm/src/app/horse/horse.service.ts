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
    this.horses$ = this.db.col$('horses', ref => ref.where('deleted', '==', false));

    // TODO test and remove
    // this.horseCollection = this.afs.collection<Horse>('horses', ref => {
    //   return ref.where('state', '==', true);
    // });
    // this.activeHorses$ = this.horseCollection.valueChanges();

    this.activeHorses$ = this.db.col$('horses', ref => ref.where('state', '==', true).where('deleted', '==', false));
  }

  // Get horses
  getHorses() {
    return this.horses$;
  }

  // Get active horses
  getActiveHorses() {
    return this.activeHorses$;
  }

  // Get a horse instance by horseID
  getHorse(key: any) {
    return this.db.doc$(`horses/${key}`);
  }

  // Non destructive update to Firestore
  updateHorseData(user: User, key, data: any, currentAlarmId?: string) {
    console.log('Updating horse' + key);
    console.log('CurrentAlarmId: ', currentAlarmId !== undefined ? currentAlarmId : 'none');
    // If there is already an alarm assigned - change the state in the alarm object
    if (currentAlarmId) {
      this.db.update('alarms', currentAlarmId, { state: false });
    }
    // Set the reference to the alarm
    if (data.alarmId) {
      this.db.update('alarms', data.alarmId, { state: true});
    }
    return this.db.update('horses', key, data)
      .then(_ => this.router.navigate(['/profile'])).catch(error => console.log(error));
  }

  // Save new horse to Firestore
  saveHorseData(user: User, key, data: any) {
    console.log('Saving new horse' + key);
    // Set the reference to the alarm
    if (data.alarmId) {
      this.db.update('alarms', data.alarmId, { state: true});
    }
    return this.db.set('horses', data)
      .then(_ => this.router.navigate(['/profile'])).catch(error => console.log(error));
  }

  // Delete horse from Firestore - sets deleted to true
  deleteHorse(horse: Horse) {
    console.log('Deleteing horse' + horse.id);
    // Delete the reference to the alarm
    if (horse.alarmId) {
      this.db.update('alarms', horse.alarmId, {state: false});
    }
    return this.db.delete('horses', horse.id)
    .then(_ => this.router.navigate(['/profile'])).catch(error => console.log(error));
  }

  // TODO test and remove
  // setHorse(data: any) {
  //   console.log('Saving new horse');
  //   return this.db.set('horses', data);
  // }

  // TODO test and remove
  // updateHorse(key: string, data: any) {
  //   console.log('Updating horse');
  //   return this.db.update('horses', key, data);
  // }

}
