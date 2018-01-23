import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FirestoreService } from '../firestore.service';
import { AlertHandlerService } from '../alert-handler.service';
import { Router } from '@angular/router';
import { Alert } from '../alert';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class AlertsService {

  alerts$: Observable<Alert[]> | Observable<any>;
  alertsCount$: Observable<Alert[]> | Observable<any>;
  alertsHistory$: Observable<Alert[]> | Observable<any>;

  constructor(
    private db: FirestoreService,
    private alertHandler: AlertHandlerService,
    private router: Router,
    private fs: AngularFirestore
  ) {

    // Define the data streams
    this.alerts$ = this.db.col$('alerts', ref => ref.where('deleted', '==', false).where('viewed', '==', false).limit(3));
    this.alertsCount$ = this.db.col$('alerts', ref => ref.where('deleted', '==', false).where('viewed', '==', false));
    this.alertsHistory$ = this.db.col$('alerts', ref => ref.orderBy('createdAt', 'desc').limit(13));

  }

    // Get unseen alerts
    get alerts(): Observable<Alert[]> {
      return this.alerts$;
    }

    // Get all alerts
    get alertsHistory(): Observable<Alert[]> {
      return this.alertsHistory$;
    }

    // Get all alertscount
    get alertsCount(): Observable<Alert[]> {
      return this.alertsCount$;
    }


    // Dismiss Alert
    dismissAlert(alert: Alert) {
      // Set viewed to false
      const data = { viewed: true };
      console.log('Dismissing Alert');
      return this.db.update('alerts', alert.id, data)
      .catch(error => console.log(error));
    }

    // Remove an alert (delete from firestore)
    removeAlert(key: string) {
      this.fs.collection('alerts').doc(key).delete().then(function() {
        console.log('Alert successfully deleted!');
    }).catch(function(error) {
        console.error('Error removing document: ', error);
    });
    }

}
