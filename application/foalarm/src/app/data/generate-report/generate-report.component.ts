import { Component, OnInit } from '@angular/core';
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

  reports: Observable<any>;
  alarmKey: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private reportService: ReportService
  ) { }

  ngOnInit() {
    this.alarmKey = this.activatedRoute.snapshot.params['id'];
    this.reports = this.reportService.getReports(this.alarmKey);
  }

  // Creates new report, triggering Cloud Function
  requestReport() {
    const data = {
      alarmId: this.alarmKey,
      status: 'processing'
    };
    this.reportService.createReport(data);
  }
}
