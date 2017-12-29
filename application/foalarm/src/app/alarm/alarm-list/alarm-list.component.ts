import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AlertHandlerService } from '../../alert-handler.service';
import { Alarm } from '../../alarm';
import { AlarmService } from '../alarm.service';

@Component({
  selector: 'app-alarm-list',
  templateUrl: './alarm-list.component.html',
  styleUrls: ['./alarm-list.component.css']
})
export class AlarmListComponent implements OnInit {

  alarms$: Observable<Alarm[]> | Observable<any> | null;

  constructor(
    private alarmService: AlarmService
  ) { }

  ngOnInit() {

    this.getAlarms();

  }

  getAlarms() {
    this.alarms$ = this.alarmService.alarms;
  }

}
