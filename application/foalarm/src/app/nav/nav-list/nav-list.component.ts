/*
 * File: nav-list.component.ts
 * Project: /Users/david/Foalarm/application/foalarm
 * File Created: Wednesday, 17th January 2018 11:40:04 am
 * Author: david
 * -----
 * Last Modified: Thursday, 12th April 2018 4:11:04 pm
 * Modified By: david
 * -----
 * Description: Navigation
 */

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

  public alerts$: Observable<Alert[]> | Observable<any> | null;

  constructor(
    private alertsService: AlertsService
  ) { }

  ngOnInit() {
    this.getAlerts();
  }

  /**
   * Displays the number of unseen alerts in the template
   */
  getAlerts() {
    this.alerts$ = this.alertsService.alertsCount$;
  }
}
