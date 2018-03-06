import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  reports$: Observable<any>;

  constructor(private reportService: ReportService) { }

  ngOnInit() {
    this.reports$ = this.reportService.allReports;
  }

}
