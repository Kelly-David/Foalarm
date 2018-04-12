/*
 * File: horse.service.ts
 * Project: /Users/david/Foalarm/application/foalarm
 * File Created: Wednesday, 20th December 2017 11:32:34 am
 * Author: david
 * -----
 * Last Modified: Thursday, 12th April 2018 12:02:55 pm
 * Modified By: david
 * -----
 * Description: Horse Service
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { User } from '../user';
import { empty } from 'rxjs/Observer';
import { AlertHandlerService } from '../alert-handler.service';
import { Horse } from '../horse';
import { FirestoreService } from '../firestore.service';
import { AuthService } from '../core/auth.service';

@Injectable()
export class HorseService {

  public horses$: Observable<Horse[]>;
  public activeHorses$: Observable<Horse[]>;
  public horseCams$: Observable<Horse[]>;
  private userUID: string;

  constructor(
    private db: FirestoreService,
    private alert: AlertHandlerService,
    private router: Router,
    private authService: AuthService
  ) {
    // Subscribe to AlertHandlerService to recive authentication errors
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
   * Return observable to horse collection where property: state = true
   */
  get horses() {
    return this.horses$;
  }

  /**
   * Return observable to horse collection where property: camera !null
   */
  get horseCams() {
    return this.horseCams$;
  }

  /**
   * Return observable to horse collection where property: state = true
   */
  get activeHorses() {
    return this.activeHorses$;
  }

  /**
   * Return observable to horse document
   * @param key Horse id
   */
  public getHorse(key: any) {
    return this.db.doc$(`horses/${key}`);
  }

  /**
   * Updates a horse document
   * @param user Auth user uid
   * @param key Horse id to update
   * @param data Object of properties to update
   * @param currentAlarmId The alarm id (opt)
   */
  public updateHorseData(user: User, key, data: any, currentAlarmId?: string) {
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
      .then(_ => this.router.navigate(['/profile']))
      .catch(error => console.log(error));
  }

  /**
   * Creates a new horse document
   * @param user Auth user uid
   * @param key TODO refactor to remove
   * @param data Horse properties
   */
  public saveHorseData(user: User, key, data: any) {
    // Set the reference to the alarm
    if (data.alarmId) {
      this.db.update('alarms', data.alarmId, { state: true});
    }
    return this.db.set('horses', data)
      .then(_ => this.router.navigate(['/profile']))
      .catch(error => console.log(error));
  }

  /**
   * Delete horse (set horse doc property deleted = true)
   * @param horse horse object
   */
  public deleteHorse(horse: Horse) {
    // Update the reference to the alarm
    if (horse.alarmId) {
      this.db.update('alarms', horse.alarmId, {state: false});
    }
    return this.db.delete('horses', horse.id)
    .then(_ => this.router.navigate(['/profile']))
    .catch(error => console.log(error));
  }

}
