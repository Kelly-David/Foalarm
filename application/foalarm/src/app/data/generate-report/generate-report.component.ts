/*
 * File: generate-report.component.ts
 * Project: /Users/david/Foalarm/application/foalarm
 * File Created: Wednesday, 21st February 2018 10:34:29 am
 * Author: david
 * -----
 * Last Modified: Thursday, 12th April 2018 3:30:33 pm
 * Modified By: david
 * -----
 * Description: Generate an activity data report.
 */

import { Component, OnInit, ViewChild, ElementRef, TemplateRef} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from '../report.service';
import { Alarm } from '../../alarm';
import { AlarmService } from '../../alarm/alarm.service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.css']
})
export class GenerateReportComponent implements OnInit {

  @ViewChild('confirmModal') confirmModal: ElementRef;
  public alarmKey: string;
  public modalRef: BsModalRef;
  public alarm$: Observable<Alarm> | Observable<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private alarmService: AlarmService,
    private reportService: ReportService,
    private modalService: BsModalService,
    private authService: AuthService
  ) { }

  ngOnInit() { }

  /**
   * Creates new report, will trigger server Function
   */
  requestReport() {
    const data = {
      ownerUID: this.authService.uString,
      alarmId: this.alarmKey,
      status: 'processing'
    };
    return this.reportService.createReport(data)
    .then(_ => this.modalRef.hide());
  }

  /**
   * The Alarm id is received from child component
   * @param event as string
   */
  receiveSelectedOption($event) {
    this.alarmKey = $event;
    this.getAlarm(this.alarmKey);
  }

  /**
   * Retrive the alarm doc to display in the template
   * @param key
   */
  private getAlarm(key: any) {
    this.alarmService.getAlarm(key);
  }

  /**
   * Display a confirmation modal
   * @param template
   */
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: ''});
  }

}
