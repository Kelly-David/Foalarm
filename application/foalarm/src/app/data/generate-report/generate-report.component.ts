import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
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

  reportsRef: AngularFirestoreCollection<any>;
  reports: Observable<any>;
  alarmKey: string;

  constructor(
    private afs: AngularFirestore,
    private activatedRoute: ActivatedRoute,
    private reportService: ReportService
  ) { }

  ngOnInit() {
    this.alarmKey = this.activatedRoute.snapshot.params['id'];
    this.reports = this.reportService.reports;
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
