/*
 * File: alert-edit.component.ts
 * Project: /Users/david/Foalarm/application/foalarm
 * File Created: Wednesday, 17th January 2018 3:04:46 pm
 * Author: david
 * -----
 * Last Modified: Thursday, 12th April 2018 2:12:16 pm
 * Modified By: david
 * -----
 * Description: Displays observable to alert document
 */

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

  public alerts$: Observable<Alert[]> | Observable<any> | null;
  public term: any;
  public date: any;

  constructor(
    private alertsService: AlertsService
  ) { }

  ngOnInit() {
    this.getAlerts();
  }

  /**
   * Returns observable to all alerts
   */
  private getAlerts() {
    this.alerts$ = this.alertsService.alertsHistory;
  }

  /**
   * Update this alert doc
   * @param alert this alert
   */
  public dismissAlert(key: string) {
    return this.alertsService.dismissAlert(key);
  }

  /**
   * Remove this alert
   * @param key alert id
   */
  public remove(key: string) {
    this.alertsService.removeAlert(key);
  }

}
