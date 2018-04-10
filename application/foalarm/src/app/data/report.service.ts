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
   * Creates a new report doc
   * @param data
   */
  createReport(data: any) {
    // Set the reference to the alarm
    return this.db.set('reports', data)
    .catch(error => console.log(error));
  }

  /**
   * Remove a report doc (update delete = true)
   * @param key
   */
  removeReport(key: string) {
    this.fs.collection('reports').doc(key).update({deleted: true}).then(function () {
      console.log('Report successfully deleted!');
    }).catch(function (error) {
      console.error('Error removing document: ', error);
    });
  }

  /**
   * Returns observable to all reports relating to an alarm
   * @param key
   */
  getReports(key) {
    return this.db.col$('reports', ref => ref.where('deleted', '==', false).where('alarmId', '==', key));
  }

  /**
   * Returns observable to reports collection
   */
  get allReports() {
    return this.$allReports;
  }
}
