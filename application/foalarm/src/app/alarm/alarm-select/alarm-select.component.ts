import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

  alarms$: Observable<Alarm[]> | Observable<any>;
  selectedAlarm = 'No alarm selected' as string;
  removeAlarm = 'remove' as string;

  @Output() messageEvent = new EventEmitter<string>();

  constructor(
    public alarmService: AlarmService
  ) { }

  ngOnInit() {
    this.getAlarms();
  }

  getAlarms() {
    this.alarms$ = this.alarmService.availAlarms;
  }

  sendMessage() {
    this.messageEvent.emit(this.selectedAlarm);
  }
}
