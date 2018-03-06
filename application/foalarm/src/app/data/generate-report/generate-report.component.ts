import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.css']
})
export class GenerateReportComponent implements OnInit {

  @ViewChild('confirmModal') confirmModal: ElementRef;
  alarmKey: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private reportService: ReportService
  ) { }

  ngOnInit() {
    // this.alarmKey = this.activatedRoute.snapshot.params['id'];
  }

  // Creates new report, triggering Cloud Function
  requestReport() {
    const data = {
      alarmId: this.alarmKey,
      status: 'processing'
    };
    this.reportService.createReport(data);
  }

  receiveSelectedOption($event) {
    this.alarmKey = $event;
  }
}
