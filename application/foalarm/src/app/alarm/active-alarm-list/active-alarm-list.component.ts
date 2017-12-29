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

  getAlarms() {
    this.alarms$ = this.alarmService.activeAlarms;
  }

}
