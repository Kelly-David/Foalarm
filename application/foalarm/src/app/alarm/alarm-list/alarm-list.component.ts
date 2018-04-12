/*
 * File: alarm-list.component.ts
 * Project: /Users/david/Foalarm/application/foalarm
 * File Created: Tuesday, 27th March 2018 8:22:12 am
 * Author: david
 * -----
 * Last Modified: Thursday, 12th April 2018 1:25:52 pm
 * Modified By: david
 * -----
 * Description: Displays a list of all alarm documents
 */

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AlertHandlerService } from '../../alert-handler.service';
import { Alarm } from '../../alarm';
import { AlarmService } from '../alarm.service';
import { BsModalService } from 'ngx-bootstrap';
import { BsModalRef } from 'ngx-bootstrap';
import { FormEditModalComponent } from '../../modal/form-edit-modal/form-edit-modal.component';

@Component({
  selector: 'app-alarm-list',
  templateUrl: './alarm-list.component.html',
  styleUrls: ['./alarm-list.component.css']
})
export class AlarmListComponent implements OnInit {

  public alarms$: Observable<Alarm[]> | Observable<any> | null;
  public bsModalRef: BsModalRef;

  constructor(
    private alarmService: AlarmService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.getAlarms();
  }

  /**
   * Returns observable of all alarm documents
   */
  private getAlarms() {
    this.alarms$ = this.alarmService.alarms;
  }

  /**
   * Create a model dialog - title is passed as input to the child component.
   * @param id alarm id
   */
  public openClientModal(id?: string) {
    this.bsModalRef = this.modalService.show(FormEditModalComponent, {class: 'modal-dialog'});
    this.bsModalRef.content.parent = 'alarm';
    this.bsModalRef.content.key = id;
  }

}
