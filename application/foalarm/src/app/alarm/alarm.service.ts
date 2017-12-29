import { Injectable } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { AlertHandlerService } from '../alert-handler.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Alarm } from '../alarm';

@Injectable()
export class AlarmService {

  alarms$: Observable<Alarm[]> | Observable<any>;
  activeAlarms$: Observable<Alarm[]> | Observable<any>;

  constructor(
    private db: FirestoreService,
    private alert: AlertHandlerService,
    private router: Router
  ) {

    // Define the alarm$ variable
    this.alarms$ = this.db.col$('alarms');
    this.activeAlarms$ = this.db.col$('alarms', ref => ref.where('state', '==', true));
  }

  // Get all alarms
  get alarms(): Observable<Alarm[]> {
    return this.alarms$;
  }

  // Get all active alarms
  get activeAlarms(): Observable<Alarm[]> {
    return this.activeAlarms$;
  }

  setAlarm(data: any): any {
    // TODO remove
    // Test
    console.log('Saving new alarm');
    return this.db.set('alarms', data);
  }

}
