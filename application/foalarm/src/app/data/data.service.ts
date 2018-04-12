/*
 * File: data.service.ts
 * Project: /Users/david/Foalarm/application/foalarm
 * File Created: Thursday, 25th January 2018 12:14:55 pm
 * Author: david
 * -----
 * Last Modified: Thursday, 12th April 2018 3:04:39 pm
 * Modified By: david
 * -----
 * Description: Data Service
 */

import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class DataService {

  public data$: Observable<any[]> | null;

  constructor(
    private realTimeDB: AngularFireDatabase
  ) {}

  /**
   * Returns an observable to Firebase Realtime DB alarm activity list
   * @param key alarm id
   * @param limit number of documents to query (no. of data points to plot)
   */
  getActivityData(key: any, limit = 1800 as number): Observable<any> {
    return this.realTimeDB.list(`/activity/${key}`, ref => ref
                          .limitToLast(limit)).valueChanges();
  }

}
