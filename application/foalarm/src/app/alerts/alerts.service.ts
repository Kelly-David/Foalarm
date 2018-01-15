import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FirestoreService } from '../firestore.service';
import { AlertHandlerService } from '../alert-handler.service';
import { Router } from '@angular/router';
import { Alert } from '../alert';

@Injectable()
export class AlertsService {

  alerts$: Observable<Alert[]> | Observable<any>;

  constructor(
    private db: FirestoreService,
    private alertHandler: AlertHandlerService,
    private router: Router
  ) {

    // Define the data streams
    this.alerts$ = this.db.col$('alerts', ref => ref.where('deleted', '==', false).where('viewed', '==', false));
  }

    // Get all alerts
    get alerts(): Observable<Alert[]> {
      return this.alerts$;
    }

}
