import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.css']
})
export class GenerateReportComponent implements OnInit {

  orders: Observable<any>;
  reportsRef: AngularFirestoreCollection<any>;
  reports: Observable<any>;

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {

    this.orders = this.afs.collection('orders').valueChanges();
    this.reportsRef = this.afs.collection('reports');

    // Map the snapshot to include the document ID
    this.reports = this.reportsRef
      .snapshotChanges().map(arr => {
      return arr.map(snap => {
        const data = snap.payload.doc.data();
        const id = snap.payload.doc.id;
        return { ...data, id };
      });
    });

  }

  // Creates new report, triggering FCF
  requestReport() {
    const data = {
      status: 'processing',
      createdAt: new Date()
    };
    this.reportsRef.add(data);
  }

}
