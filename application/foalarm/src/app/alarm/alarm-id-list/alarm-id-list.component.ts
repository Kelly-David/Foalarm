/*
 * File: alarm-id-list.component.ts
 * Project: /Users/david/Foalarm/application/foalarm
 * File Created: Saturday, 10th March 2018 8:26:33 pm
 * Author: david
 * -----
 * Last Modified: Thursday, 12th April 2018 1:22:44 pm
 * Modified By: david
 * -----
 * Description: Displays a list of available alarm id
 * to create alarm documents.
 */

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AlarmService } from '../alarm.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-alarm-id-list',
  templateUrl: './alarm-id-list.component.html',
  styleUrls: ['./alarm-id-list.component.css']
})
export class AlarmIdListComponent implements OnInit {

  @Output() selectIDEvent = new EventEmitter<string>();

  public alarms$: Observable<{}[]> | Observable <any> | null;
  public selectedID = 'No alarm seleted' as string;


  constructor(
    private alarmService: AlarmService
  ) { }

  ngOnInit() {
    this.getAlarmIds();
  }

  /**
   * Retrieve observable to alarm ID collection
   */
  private getAlarmIds() {
    this.alarms$ = this.alarmService.alarmIDs$;
  }

  /**
   * Send the selected alarm id to parent component
   */
  public sendID() {
    this.selectIDEvent.emit(this.selectedID);
  }

}
