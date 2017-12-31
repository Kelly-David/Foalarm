import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Alarm } from '../../alarm';
import { AlarmService } from '../alarm.service';

@Component({
  selector: 'app-alarm-select',
  templateUrl: './alarm-select.component.html',
  styleUrls: ['./alarm-select.component.css']
})
export class AlarmSelectComponent implements OnInit {

  alarms$: Observable<Alarm[]> | Observable<any>;
  selectedAlarm: Observable<Alarm> | Observable<any>;

  constructor(
    public alarmService: AlarmService
  ) { }

  ngOnInit() {
    this.getAlarms();
  }

  getAlarms() {
    this.alarms$ = this.alarmService.availAlarms;
  }
}
