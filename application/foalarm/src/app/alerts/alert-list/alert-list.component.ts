/*
 * File: alert-list.component.ts
 * Project: /Users/david/Foalarm/application/foalarm
 * File Created: Monday, 15th January 2018 2:06:21 pm
 * Author: david
 * -----
 * Last Modified: Thursday, 12th April 2018 2:23:25 pm
 * Modified By: david
 * -----
 * Description: Displays a list of most recent alerts to the user
 */

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

  public alerts$: Observable<Alert[]> | Observable<any> | null;

  constructor(
    private alertService: AlertsService
  ) { }

  ngOnInit() {
    this.getAlerts();
  }

  /**
   * Returns observable to alerts (limit 3)
   */
  private getAlerts() {
    this.alerts$ = this.alertService.alerts;
  }

  /**
   * Dismiss the alert. Sets viewed=true to hide from view
   * @param key alertId
   */
  public dismissAlert(key: string) {
    return this.alertService.dismissAlert(key);
  }

}
