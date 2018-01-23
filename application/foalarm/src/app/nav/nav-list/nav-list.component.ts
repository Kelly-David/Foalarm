import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Alert } from '../../alert';
import { AlertsService } from '../../alerts/alerts.service';

@Component({
  selector: 'app-nav-list',
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.css']
})
export class NavListComponent implements OnInit {

  alerts$: Observable<Alert[]> | Observable<any> | null;

  constructor(
    private alertsService: AlertsService
  ) { }

  ngOnInit() {

    this.getAlerts();
  }

  getAlerts() {
    this.alerts$ = this.alertsService.alertsCount$;
  }
}
