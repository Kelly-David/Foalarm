/*
 * File: alarm-link.component.ts
 * Project: /Users/david/Foalarm/application/foalarm
 * File Created: Tuesday, 6th March 2018 12:25:09 pm
 * Author: david
 * -----
 * Last Modified: Thursday, 12th April 2018 3:14:14 pm
 * Modified By: david
 * -----
 * Description: Child component: Displays an alarm doc in template
 */

import { Component, OnChanges, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AlarmService } from '../../alarm/alarm.service';
import { Alarm } from '../../alarm';

@Component({
  selector: 'app-alarm-link',
  templateUrl: './alarm-link.component.html',
  styleUrls: ['./alarm-link.component.css']
})
export class AlarmLinkComponent implements OnChanges {

  @Input() key: any;
  public alarm$: Observable<Alarm> | Observable<{}> | null;

  constructor(private alarmService: AlarmService) { }

  ngOnChanges() {
    this.alarm$ = this.alarmService.getAlarm(this.key);
  }
}
