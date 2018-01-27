import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-data-graph',
  templateUrl: './data-graph.component.html',
  styleUrls: ['./data-graph.component.css']
})
export class DataGraphComponent implements OnInit {

  alarmKey: string;
  data$: Observable<any> | null;
  chartOptions = { responsive: true };
  chartData = [
    { data: [330, 600, 260, 700], label: 'X', other: 'hello', k: 'g' },
    { data: [120, 455, 100, 340], label: 'Y', other: 'hello'},
    { data: [45, 67, 800, 500], label: 'Z', other: 'hello' }
  ];
  chartLabels = ['1am', '2am', '3am', '4am'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
  ) { }

  ngOnInit() {
    // Get the alarm hey from the url
    this.alarmKey = this.activatedRoute.snapshot.params['id'];
    // Retrieve the instance from FS
    this.getData();

  }

  getData() {
    this.data$ = this.dataService.getData(this.alarmKey);
  }

  onChartClick(event) {
    console.log(event);
  }

}
