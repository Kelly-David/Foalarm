import { Component, OnInit, Input } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-report-link',
  templateUrl: './report-link.component.html',
  styleUrls: ['./report-link.component.css']
})
export class ReportLinkComponent implements OnInit {

  @Input() report: any;
  downloadUrl: Observable<string>;


  constructor(private reportService: ReportService) { }

  ngOnInit() {
    const reportRef = firebase.storage().ref(`reports/${this.report.id}.csv`);
    const promise = reportRef.getDownloadURL();

    this.downloadUrl = Observable.fromPromise(promise);
  }

  remove(key: string) {
    this.reportService.removeReport(key);
  }

}
