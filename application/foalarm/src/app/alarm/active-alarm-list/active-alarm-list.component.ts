/*
 * File: active-alarm-list.component.ts
 * Project: /Users/david/Foalarm/application/foalarm
 * File Created: Friday, 29th December 2017 2:07:06 pm
 * Author: david
 * -----
 * Last Modified: Thursday, 12th April 2018 1:04:06 pm
 * Modified By: david
 * -----
 * Description: Displays a list of alarms that are currently
 * assigned to a horse.
 */

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Alarm } from '../../alarm';
import { AlarmService } from '../alarm.service';

@Component({
  selector: 'app-active-alarm-list',
  templateUrl: './active-alarm-list.component.html',
  styleUrls: ['./active-alarm-list.component.css']
})
export class ActiveAlarmListComponent implements OnInit {

  public alarms$: Observable<Alarm[]> | Observable<any> | null;
  public collapse = false as boolean;

  constructor(
    private alarmService: AlarmService
  ) { }

  ngOnInit() {
    this.getAlarms();
  }

  /**
   * Returns observable of all active alarms
   */
  private getAlarms() {
    this.alarms$ = this.alarmService.activeAlarms;
  }

  /**
   * Show or hide the element
   */
  public toggleCollapse() {
    this.collapse = !this.collapse;
  }

  /**
   * TESTING: Tests the SMS alert cloud funtion is working
   * @param alarm
   */
  public testAlarm(alarm: Alarm) {
    return this.alarmService.testAlarm(alarm.id, {
      alert: true,
      x: 5,
      y: 12,
      z: 7
    });
  }

}
