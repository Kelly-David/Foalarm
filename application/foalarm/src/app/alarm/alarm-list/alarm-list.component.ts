import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AlertHandlerService } from '../../alert-handler.service';
import { Alarm } from '../../alarm';
import { AlarmService } from '../alarm.service';
import { BsModalService } from 'ngx-bootstrap';
import { BsModalRef } from 'ngx-bootstrap';
import { AlarmEditModalComponent } from '../alarm-edit-modal/alarm-edit-modal.component';

@Component({
  selector: 'app-alarm-list',
  templateUrl: './alarm-list.component.html',
  styleUrls: ['./alarm-list.component.css']
})
export class AlarmListComponent implements OnInit {

  alarms$: Observable<Alarm[]> | Observable<any> | null;
  bsModalRef: BsModalRef;

  constructor(
    private alarmService: AlarmService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {

    this.getAlarms();

  }

  getAlarms() {
    this.alarms$ = this.alarmService.alarms;
  }

  // Create a model dialog - title is passed as input to the child component.
  openClientModal(id?: string) {
    this.bsModalRef = this.modalService.show(AlarmEditModalComponent, {class: 'modal-dialog'});
    this.bsModalRef.content.key = id;
  }

}
