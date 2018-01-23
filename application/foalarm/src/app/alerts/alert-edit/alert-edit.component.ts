import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Alert } from '../../alert';
import { AlertsService } from '../alerts.service';
import { FilterPipe, FilterDatePipe } from '../../pipes/alert.pipe';

@Component({
  selector: 'app-alert-edit',
  templateUrl: './alert-edit.component.html',
  styleUrls: ['./alert-edit.component.css']
})
export class AlertEditComponent implements OnInit {

  alerts$: Observable<Alert[]> | Observable<any> | null;
  term: any;
  date: any;

  constructor(
    private alertsService: AlertsService
  ) { }

  ngOnInit() {

    this.getAlerts();

  }

  getAlerts() {
    this.alerts$ = this.alertsService.alertsHistory;
  }

  dismissAlert(alert: Alert) {
    console.log(alert.id);
    return this.alertsService.dismissAlert(alert);
  }

  remove(key: string) {
    console.log(key);
    this.alertsService.removeAlert(key);
  }

}
