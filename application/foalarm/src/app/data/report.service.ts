import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { FirestoreService } from '../firestore.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ReportService {

  private $reports: Observable<any[]> | Observable<null> | null;
  private $allReports: Observable<any[]> | Observable<null> | null;

  constructor(private fs: AngularFirestore,
  private db: FirestoreService) {

    // Query the reports collection
    this.$allReports = this.db.col$('reports', ref => ref.where('deleted', '==', false)
                                                          .limit(5)
                                                          .orderBy('updatedAt', 'desc'));
  }
  // Save new report to Firestore
  createReport(data: any) {
    // Testing - TODO remove
    console.log('Saving new report');
    // Set the reference to the alarm
    return this.db.set('reports', data)
    .catch(error => console.log(error));
  }

  // Remove an alert (delete from firestore)
  removeReport(key: string) {
    this.fs.collection('reports').doc(key).update({deleted: true}).then(function () {
      console.log('Report successfully deleted!');
    }).catch(function (error) {
      console.error('Error removing document: ', error);
    });
  }

  getReports(key) {
    return this.db.col$('reports', ref => ref.where('deleted', '==', false).where('alarmId', '==', key));
  }

  get allReports() {
    return this.$allReports;
  }
}
