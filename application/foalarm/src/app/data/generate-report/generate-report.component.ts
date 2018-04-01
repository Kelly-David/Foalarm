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
  alarmKey: string;
  modalRef: BsModalRef;
  alarm$: Observable<Alarm> | Observable<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private alarmService: AlarmService,
    private reportService: ReportService,
    private modalService: BsModalService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    // this.alarmKey = this.activatedRoute.snapshot.params['id'];
  }

  // Creates new report, triggering Cloud Function
  requestReport() {
    const data = {
      ownerUID: this.authService.uString,
      alarmId: this.alarmKey,
      status: 'processing'
    };
    this.reportService.createReport(data);
  }

  receiveSelectedOption($event) {
    this.alarmKey = $event;
    this.getAlarm(this.alarmKey);
  }

  private getAlarm(key: any) {
    this.alarmService.getAlarm(key);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: ''});
  }

}
