/*
 * File: alarm-select.component.ts
 * Project: /Users/david/Foalarm/application/foalarm
 * File Created: Sunday, 31st December 2017 9:31:59 am
 * Author: david
 * -----
 * Last Modified: Thursday, 12th April 2018 1:29:24 pm
 * Modified By: david
 * -----
 * Description: Displays a list of alarm doc ids that are
 * available to be assigned to a horse
 */

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Alarm } from '../../alarm';
import { AlarmService } from '../alarm.service';

@Component({
  selector: 'app-alarm-select',
  templateUrl: './alarm-select.component.html',
  styleUrls: ['./alarm-select.component.css']
})
export class AlarmSelectComponent implements OnInit {

  @Input() parent: string;
  @Output() messageEvent = new EventEmitter<string>();

  public alarms$: Observable<Alarm[]> | Observable<any>;
  public selectedAlarm = 'No alarm selected' as string;
  public removeAlarm = 'remove' as string;

  constructor(
    public alarmService: AlarmService
  ) { }

  ngOnInit() {
    if (this.parent === 'h') {
      this.getAlarms();
    } else if (this.parent === 'd') {
      this.getActiveAlarms();
    }
  }

  /**
   * Retrieve the alarm observable
   */
  public getAlarms() {
    this.alarms$ = this.alarmService.availAlarms;
  }

  /**
   * Retrieve the alarm observable (active Alarms)
   */
  public getActiveAlarms() {
    this.alarms$ = this.alarmService.activeAlarms;
  }

  /**
   * Emit the alarmId as event to parent component
   */
  public sendMessage() {
    this.messageEvent.emit(this.selectedAlarm);
  }
}
