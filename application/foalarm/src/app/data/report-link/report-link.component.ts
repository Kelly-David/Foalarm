/*
 * File: report-link.component.ts
 * Project: /Users/david/Foalarm/application/foalarm
 * File Created: Wednesday, 21st February 2018 11:48:43 am
 * Author: david
 * -----
 * Last Modified: Thursday, 12th April 2018 3:41:05 pm
 * Modified By: david
 * -----
 * Description: Displays the download URL of an activity report
 */

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
  public downloadUrl: Observable<string>;

  constructor(private reportService: ReportService) { }

  ngOnInit() {
    const reportRef = firebase.storage().ref(`data/${this.report.id}.csv`);
    const promise = reportRef.getDownloadURL();
    this.downloadUrl = Observable.fromPromise(promise);
  }

  /**
   * Remove the report (update deleted = true)
   * @param key this.report
   */
  remove(key: string) {
    this.reportService.removeReport(key);
  }

}
