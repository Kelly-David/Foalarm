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
  data = [ {
    'name': 'X axis',
    'series': [ ]
  }, {
    'name': 'Y axis',
    'series': [ ]
  }, {
    'name': 'Z axis',
    'series': [ ]
  }];

  view: any[] = [800, 500];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
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
    this.getData();

  }

  getData() {
    this.dataService.getActivityData(this.alarmKey).subscribe((results) => {
      this.chartdata = true;
      this.prepChartData(results);
    });
  }

  prepChartData(entries: any[]) {
    entries.forEach(element => {
      // const datetime = Date.toString();
      // TODO remove
      // console.log(element);
      if (element.x) {
        this.data[0]['series'].push({'name': element.date, 'value': element.x});
      }
      if (element.y) {
        this.data[1]['series'].push({'name': element.date, 'value': element.y});
      }
      if (element.z) {
        this.data[2]['series'].push({'name': element.date, 'value': element.z});
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
