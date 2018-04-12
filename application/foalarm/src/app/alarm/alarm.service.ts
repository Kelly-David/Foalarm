/*
 * File: alarm.service.ts
 * Project: /Users/david/Foalarm/application/foalarm
 * File Created: Friday, 29th December 2017 1:25:58 pm
 * Author: david
 * -----
 * Last Modified: Thursday, 12th April 2018 1:42:45 pm
 * Modified By: david
 * -----
 * Description: Alarm service
 */

import { Injectable } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { AlertHandlerService } from '../alert-handler.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Alarm } from '../alarm';
import { AuthService } from '../core/auth.service';

@Injectable()
export class AlarmService {

  public alarms$: Observable<Alarm[]> | Observable<any>;
  public activeAlarms$: Observable<Alarm[]> | Observable<any>;
  public availAlarms$: Observable<Alarm[]> | Observable<any>;
  public alarmIDs$: Observable<{}[]> | Observable<any>;

  constructor(
    private db: FirestoreService,
    private alert: AlertHandlerService,
    private router: Router,
    private authService: AuthService
  ) {

    // Define the alarm observables
    // All alarms
    this.alarms$ = this.db.col$('alarms', ref => ref
                          .where('deleted', '==', false)
                          .where('ownerUID', '==', this.authService.uString));
    // Alarms that are assigned to a horse
    this.activeAlarms$ = this.db.col$('alarms', ref => ref
                                .where('state', '==', true)
                                .where('deleted', '==', false)
                                .where('ownerUID', '==', this.authService.uString));
    // Alarms that are not assigned to a horse
    this.availAlarms$ = this.db.col$('alarms', ref => ref
                               .where('state', '==', false)
                               .where('deleted', '==', false)
                               .where('ownerUID', '==', this.authService.uString));
    // Unassigned alarm ids
    this.alarmIDs$ = this.db.col$('alarmID', ref => ref
                                .where('deleted', '==', false));
  }

  /**
   * Get all alarms
   */
  get alarms(): Observable<Alarm[]> {
    return this.alarms$;
  }

  /**
   * Get all active alarms
   */
  get activeAlarms(): Observable<Alarm[]> {
    return this.activeAlarms$;
  }

  /**
   * Returns observable to all alarm docs where state is false (available)
   */
  get availAlarms(): Observable<Alarm[]> {
    return this.availAlarms$;
  }

  /**
   * Get an alarm instance by alarmID. Returns observable
   * @param key
   */
  getAlarm(key: any): Observable<Alarm> {
    return this.db.doc$(`alarms/${key}`);
  }

  /**
   * Updates an alarm doc. Firestore non-destructive update
   * @param key
   * @param data
   */
  updateAlarmData(key: any, data: any): Promise<any> {
    console.log('Updating alarm: ', key);
    return this.db.update('alarms', key, data)
    .then(_ => this.router.navigate(['/profile/alarm-list']))
    .catch(error => console.log(error));
  }

  /**
   * Creates a new alarm doc, using exisiting id from available alarms
   * @param key
   * @param data
   * @param id
   */
  saveAlarmData(key: any, data: any, id?: string): Promise<any> {
    console.log('Saving new alarm' + key);
    // Also create a reference in the data collection
    return this.db.set('alarms', data, id)
    .then(_ => this.updateIdRef(id, true))
    .then(_ => this.router.navigate(['/profile/alarm-list']))
    .catch(error =>
      console.log(error));
  }

  /**
   * Updates the selected alarm id in available id collection
   * @param key alarmId
   * @param value property val to update
   */
  public updateIdRef(key: string, value: boolean): Promise<void> {
    return this.db.update('alarmID', key, {'deleted': value});
  }

  /**
   * Remove an alarm (document update deleted = true)
   * @param alarm
   */
  public deleteAlarm(alarm: Alarm): Promise<Boolean | void> {
    console.log('Deleteing alarm' + alarm.id);
    this.updateIdRef(alarm.id, false);
    // Remove the alarm reference from the associated horse
    if (alarm.state) {
      this.db.col('horses', a => a.where('alarmId', '==', alarm.id)
                                  .where('deleted', '==', false)
                                  .where('state', '==', true))
      .ref
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          const data = doc.data();
          if (data.alarmId === alarm.id) {
            doc.ref.update({alarmId: '', state: false});
          }
        });
      });
    }
    return this.db.delete('alarms', alarm.id)
    .then(_ => this.router.navigate(['/profile/alarm-list']))
    .catch(error => console.log(error));
  }

  /**
   * TESTING ONLY
   * Replicates behaviour of the hub posting a foaling alert request
   * @param key
   * @param data
   */
  testAlarm(key: any, data: any): Promise<void> {
    console.log('Testing Alarm SMS ', key);
    return this.db.update('data', key, data)
    .catch(error => console.log(error));
  }

}
