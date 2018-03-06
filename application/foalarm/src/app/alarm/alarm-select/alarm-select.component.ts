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

  alarms$: Observable<Alarm[]> | Observable<any>;
  selectedAlarm = 'No alarm selected' as string;
  removeAlarm = 'remove' as string;

  @Input() parent: string;
  @Output() messageEvent = new EventEmitter<string>();

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

  getAlarms() {
    this.alarms$ = this.alarmService.availAlarms;
  }

  getActiveAlarms() {
    this.alarms$ = this.alarmService.activeAlarms;
  }

  sendMessage() {
    this.messageEvent.emit(this.selectedAlarm);
  }
}
