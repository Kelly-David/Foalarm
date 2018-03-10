import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AlarmService } from '../alarm.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-alarm-id-list',
  templateUrl: './alarm-id-list.component.html',
  styleUrls: ['./alarm-id-list.component.css']
})
export class AlarmIdListComponent implements OnInit {

  alarms$: Observable<{}[]> | Observable <any> | null;
  selectedID = 'No alarm seleted' as string;

  @Output() selectIDEvent = new EventEmitter<string>();

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
