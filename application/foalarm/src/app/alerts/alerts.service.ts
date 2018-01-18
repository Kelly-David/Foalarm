import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FirestoreService } from '../firestore.service';
import { AlertHandlerService } from '../alert-handler.service';
import { Router } from '@angular/router';
import { Alert } from '../alert';

@Injectable()
export class AlertsService {

  alerts$: Observable<Alert[]> | Observable<any>;
  alertsHistory$: Observable<Alert[]> | Observable<any>;

  constructor(
    private db: FirestoreService,
    private alertHandler: AlertHandlerService,
    private router: Router
  ) {

    // Define the data streams
    this.alerts$ = this.db.col$('alerts', ref => ref.where('deleted', '==', false).where('viewed', '==', false));
    this.alertsHistory$ = this.db.col$('alerts', ref => ref.orderBy('createdAt', 'desc'));
  }

    // Get unseen alerts
    get alerts(): Observable<Alert[]> {
      return this.alerts$;
    }

    // Get all alerts
    get alertsHistory(): Observable<Alert[]> {
      return this.alertsHistory$;
    }


    // Dismiss Alert
    dismissAlert(alert: Alert) {
      // Set viewed to false
      const data = { viewed: true };
      console.log('Dismissing Alert');
      return this.db.update('alerts', alert.id, data)
      .catch(error => console.log(error));
    }

}
