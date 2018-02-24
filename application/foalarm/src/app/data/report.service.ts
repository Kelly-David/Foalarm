import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class ReportService {

  constructor(private fs: AngularFirestore) { }

  // Remove an alert (delete from firestore)
  removeReport(key: string) {
    this.fs.collection('reports').doc(key).delete().then(function () {
      console.log('Report successfully deleted!');
    }).catch(function (error) {
      console.error('Error removing document: ', error);
    });
  }
}
