import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import * as firebase from 'firebase/app';
// import { AngularFireAuth } from 'angularfire2/auth';
// import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { User } from '../user';
import { empty } from 'rxjs/Observer';
import { AlertHandlerService } from '../alert-handler.service';
import { Horse } from '../horse';
import { FirestoreService } from '../firestore.service';
import { AuthService } from '../core/auth.service';
// import { firestore } from 'firebase/app';

@Injectable()
export class HorseService {
  horses$: Observable<Horse[]>;
  activeHorses$: Observable<Horse[]>;
  // horseCollection: AngularFirestoreCollection<Horse>;
  horseCams$: Observable<Horse[]>;
  userUID: string;

  constructor(
    private db: FirestoreService,
    // private afs: AngularFirestore,
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

    // Define the active horse variable
    this.activeHorses$ = this.db.col$('horses', ref => ref
                                .where('state', '==', true)
                                .where('deleted', '==', false)
                                .where('ownerUID', '==', this.authService.uString));

    // Define the horseCams variable
    this.horseCams$ = this.db.col$('horses', ref => ref
                              .where('deleted', '==', false)
                              .where('ownerUID', '==', this.authService.uString));
  }

  /**
   * Get observable to horse collection where property: state = true
   */
  getHorses() {
    return this.horses$;
  }

  /**
   * Get observable to horse collection where property: state = true
   */
  getActiveHorses() {
    return this.activeHorses$;
  }

  /**
   * Get observable to horse collection where property: camera !null
   */
  get horseCams() {
    return this.horseCams$;
  }

  /**
   * Returns observable to horse document
   * @param key Horse id
   */
  getHorse(key: any) {
    return this.db.doc$(`horses/${key}`);
  }

  /**
   * Updates a horse document
   * @param user Auth user uid
   * @param key Horse id to update
   * @param data Object of properties to update
   * @param currentAlarmId The alarm id (opt)
   */
  updateHorseData(user: User, key, data: any, currentAlarmId?: string) {
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

  /**
   * Creates a new horse document
   * @param user Auth user uid
   * @param key TODO refactor to remove
   * @param data Horse properties
   */
  saveHorseData(user: User, key, data: any) {
    console.log('Saving new horse' + key);
    // Set the reference to the alarm
    if (data.alarmId) {
      this.db.update('alarms', data.alarmId, { state: true});
    }
    return this.db.set('horses', data)
      .then(_ => this.router.navigate(['/profile'])).catch(error => console.log(error));
  }

  /**
   * Delete horse (set horse doc property deleted = true)
   * @param horse horse object
   */
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
