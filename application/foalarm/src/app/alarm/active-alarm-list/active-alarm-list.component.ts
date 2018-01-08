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

  alarms$: Observable<Alarm[]> | Observable<any> | null;

  constructor(
    private alarmService: AlarmService
  ) { }

  ngOnInit() {

    this.getAlarms();

  }

  // Returns observable of all active alarms
  getAlarms() {
    this.alarms$ = this.alarmService.activeAlarms;
  }

  // TESTING: Tests the SMS alert cloud funtion is working
  testAlarm(alarm: Alarm) {
    return this.alarmService.testAlarm(alarm.id, {
      alert: true,
      x: 5,
      y: 12,
      z: 7
    });
  }

}
