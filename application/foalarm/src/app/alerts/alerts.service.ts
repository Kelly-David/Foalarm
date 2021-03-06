/*
 * File: alerts.service.ts
 * Project: /Users/david/Foalarm/application/foalarm
 * File Created: Monday, 15th January 2018 2:10:51 pm
 * Author: david
 * -----
 * Last Modified: Thursday, 12th April 2018 2:31:16 pm
 * Modified By: david
 * -----
 * Description: Alert service
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FirestoreService } from '../firestore.service';
import { AlertHandlerService } from '../alert-handler.service';
import { Router } from '@angular/router';
import { Alert } from '../alert';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from '../core/auth.service';

@Injectable()
export class AlertsService {

  public alerts$: Observable<Alert[]> | Observable<any>;
  public alertsCount$: Observable<Alert[]> | Observable<any>;
  public alertsHistory$: Observable<Alert[]> | Observable<any>;

  constructor(
    private db: FirestoreService,
    private alertHandler: AlertHandlerService,
    private router: Router,
    private fs: AngularFirestore,
    private authService: AuthService
  ) {

  // Define the data streams
  this.alerts$ = this.db.col$('alerts', ref => ref
                        .where('deleted', '==', false)
                        .where('viewed', '==', false)
                        .where('owner', '==', this.authService.uString)
                        .limit(3)
                        .orderBy('createdAt', 'desc'));
  // Alert observable - nav button alert count
  this.alertsCount$ = this.db.col$('alerts', ref => ref
                              .where('deleted', '==', false)
                              .where('viewed', '==', false)
                              .where('owner', '==', this.authService.uString));
  // All alerts - alert edit comp
  this.alertsHistory$ = this.db.col$('alerts', ref => ref
                                .where('owner', '==', this.authService.uString)
                                .orderBy('createdAt', 'desc')
                                .limit(13));
  }

  /**
   * Get unseen alerts. Returns observable
   */
  get alerts(): Observable<Alert[]> {
    return this.alerts$;
  }

  /**
   * Get all alerts. Returns observable
   */
  get alertsHistory(): Observable<Alert[]> {
    return this.alertsHistory$;
  }

  /**
   * Get unseen alert count. Returns observable
   */
  get alertsCount(): Observable<Alert[]> {
    return this.alertsCount$;
  }

  /**
   * Dismiss an alert (update viewed = true)
   * @param alert
   */
  public dismissAlert(key: string): Promise<void> {
    const data = { viewed: true };
    return this.db.update('alerts', key, data)
      .catch(error => console.log(error));
  }

  /**
   * Delete an alert (update deleted = true)
   * @param key
   */
  public removeAlert(key: string): Promise<void> {
    return this.fs.collection('alerts').doc(key).delete()
    .then(function () {
      console.log('Alert successfully deleted!');
    }).catch(function (error) {
      console.error('Error removing document: ', error);
    });
  }

}
