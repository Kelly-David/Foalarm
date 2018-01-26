import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
// import { ChartService } from '../chart.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-data-graph',
  templateUrl: './data-graph.component.html',
  styleUrls: ['./data-graph.component.css']
})
export class DataGraphComponent implements OnInit {

  alarmKey: string;
  data$: Observable<any> | null;

  @ViewChild('chart') el: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
  ) { }

  ngOnInit() {
    // Get the alarm hey from the url
    this.alarmKey = this.activatedRoute.snapshot.params['id'];
    // Retrieve the instance from FS
    this.getData();

    this.basicChart();
  }

  getData() {
    this.data$ = this.dataService.getData(this.alarmKey);
  }

  basicChart() {
    const element = this.el.nativeElement;
    const data = [{
      x: [1, 2, 3, 4],
      y: [1, 2, 3, 5]
    }];

    const style = {
      margin: {t: 0 }
    };

    Plotly.plot( element, data, style );
  }
}
