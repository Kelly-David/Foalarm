/*
 * File: data.component.ts
 * Project: /Users/david/Foalarm/application/foalarm
 * File Created: Tuesday, 6th March 2018 11:08:45 am
 * Author: david
 * -----
 * Last Modified: Thursday, 12th April 2018 3:16:56 pm
 * Modified By: david
 * -----
 * Description: Displays a list to all report docs
 */

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  public reports$: Observable<any>;

  constructor(private reportService: ReportService) { }

  ngOnInit() {
    this.reports$ = this.reportService.allReports;
  }

}
