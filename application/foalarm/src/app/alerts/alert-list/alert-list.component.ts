import { Component, OnInit } from '@angular/core';
import { AlertHandlerService } from '../../alert-handler.service';
import { Observable } from 'rxjs/Observable';
import { Alert } from '../../alert';
import { AlertsService } from '../alerts.service';

@Component({
  selector: 'app-alert-list',
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.css']
})
export class AlertListComponent implements OnInit {

  alerts$: Observable<Alert[]> | Observable<any> | null;

  constructor(
    private alertService: AlertsService
  ) { }

  ngOnInit() {

    this.getAlerts();

  }

  getAlerts() {
    this.alerts$ = this.alertService.alerts;
  }

}
