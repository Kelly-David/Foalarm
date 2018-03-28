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
  horseCams$: Observable<Horse[]>;
  userUID: string;

  constructor(
    private db: FirestoreService,
    private afs: AngularFirestore,
    private alert: AlertHandlerService,
    private router: Router,
    private authService: AuthService
  ) {
    // Subscribe to AlertHnadlerService to recive authentication errors
    this.authService.userIdString.subscribe((data) => {
      this.userUID = data;
    });
    // Define the Horse variable
    this.horses$ = this.db.col$('horses', ref => ref
                          .where('deleted', '==', false)
                          .where('ownerUID', '==', this.authService.uString)
                          .orderBy('displayName'));

    this.activeHorses$ = this.db.col$('horses', ref => ref
                                .where('state', '==', true)
                                .where('deleted', '==', false)
                                .where('ownerUID', '==', this.authService.uString));

    this.horseCams$ = this.db.col$('horses', ref => ref
                              .where('deleted', '==', false)
                              .where('ownerUID', '==', this.authService.uString));
  }

  // Get horses
  getHorses() {
    return this.horses$;
  }

  // Get active horses
  getActiveHorses() {
    return this.activeHorses$;
  }

  get horseCams() {
    return this.horseCams$;
  }

  // Get a horse instance by horseID
  getHorse(key: any) {
    return this.db.doc$(`horses/${key}`);
  }

  // Non destructive update to Firestore
  updateHorseData(user: User, key, data: any, currentAlarmId?: string) {
    // Testing - TODO Remove
    console.log('Updating horse' + key);
    console.log('CurrentAlarmId: ', currentAlarmId !== undefined ? currentAlarmId : 'none');
    console.log('Alarm to remove: ', data.alarmId === 'remove' ? data.alarmId : 'none');
    // If the alarm is being removed, update the alarm doc and ammend the horse data before update
    if (data.alarmId === 'remove') {
      this.db.update('alarms', currentAlarmId, { state: false });
      data.alarmId = '';
      data.state = false;
    }
    // If there is already an alarm assigned - change the state in the alarm object
    if (currentAlarmId && currentAlarmId !== 'remove') {
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

}
