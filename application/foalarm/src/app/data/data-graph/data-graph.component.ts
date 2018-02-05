import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-data-graph',
  templateUrl: './data-graph.component.html',
  styleUrls: ['./data-graph.component.css']
})
export class DataGraphComponent implements OnInit {

  chartdata = false as boolean;
  alarmKey: string;
  data$: Observable<any> | null;
  data: any[];
  timeframe = [
    {label: 1, value: 360},
    {label: 5, value: 1800},
    {label: 10, value: 3600},
    {label: 24, value: 8640}] as object[];

  view: any[] = [923, 500];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = false;
  xAxisLabel = 'Date/Time';
  showYAxisLabel = false;
  yAxisLabel = 'Value';

  colorScheme = {
    domain: ['#2c6a87', '#A10A28', '#419171', '#AAAAAA']
  };

  // line, area
  autoScale = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
  ) { }

  ngOnInit() {
    // Get the alarm hey from the url
    this.alarmKey = this.activatedRoute.snapshot.params['id'];
    // Retrieve the instance from FS
    this.subscribeToChart();

  }

  subscribeToChart(limit = 1800 as number) {
    this.dataService.getActivityData(this.alarmKey, limit).subscribe((results) => {
      this.chartdata = true;
      this.prepChartData([...results]);
    });

  }

  prepChartData(entries) {
    this.data = new Array();
    this.data.push({'name': 'X axis', 'series': []});
    this.data.push({'name': 'Y axis', 'series': []});
    this.data.push({'name': 'Z axis', 'series': []});
    let count = 0;
    entries.forEach(element => {
      count++;
      if (element.x) {
        this.data[0]['series'].push({'name': count, 'value': element.x});
      }
      if (element.y) {
        this.data[1]['series'].push({'name': count, 'value': element.y});
      }
      if (element.z) {
        this.data[2]['series'].push({'name': count, 'value': element.z});
      }
    });
  }

  onChartClick(event) {
    console.log(event);
  }

  onSelect(event) {
    console.log(event);
  }

}
