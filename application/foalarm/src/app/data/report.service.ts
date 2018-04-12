/*
 * File: report.service.ts
 * Project: /Users/david/Foalarm/application/foalarm
 * File Created: Wednesday, 21st February 2018 4:11:45 pm
 * Author: david
 * -----
 * Last Modified: Thursday, 12th April 2018 3:09:52 pm
 * Modified By: david
 * -----
 * Description: Report Service
 */

import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { FirestoreService } from '../firestore.service';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../core/auth.service';

@Injectable()
export class ReportService {

  private $reports: Observable<any[]> | Observable<null> | null;
  private $allReports: Observable<any[]> | Observable<null> | null;

  constructor(
    private fs: AngularFirestore,
    private db: FirestoreService,
    private authService: AuthService) {

    // Query the reports collection
    this.$allReports = this.db.col$('reports', ref => ref.where('deleted', '==', false)
                                                          .where('ownerUID', '==', this.authService.uString)
                                                          .limit(5)
                                                          .orderBy('updatedAt', 'desc'));
  }
  /**
   * Creates a new report doc - triggers server fucntion
   * @param data
   */
  public createReport(data: any) {
    // Set the reference to the alarm
    return this.db.set('reports', data)
    .catch(error => console.log(error));
  }

  /**
   * Remove a report doc (update delete = true)
   * @param key
   */
  public removeReport(key: string) {
    this.fs.collection('reports').doc(key).update({deleted: true}).then(function () {
    }).catch(function (error) {
      console.error('Error removing document: ', error);
    });
  }

  /**
   * Returns observable to all reports relating to an alarm
   * @param key
   */
  public getReports(key) {
    return this.db.col$('reports', ref => ref.where('deleted', '==', false).where('alarmId', '==', key));
  }

  /**
   * Returns observable to reports collection
   */
  get allReports() {
    return this.$allReports;
  }
}
