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
  // chartOptions = { responsive: true };
  // chartData = [
  //   { data: [330, 600, 260, 700], label: 'X', other: 'hello', k: 'g' },
  //   { data: [120, 455, 100, 340], label: 'Y', other: 'hello'},
  //   { data: [45, 67, 800, 500], label: 'Z', other: 'hello' }
  // ];
  // chartLabels = ['1am', '2am', '3am', '4am'];
  data = [ {
    'name': 'X-axis',
    'series': [ ]
  }, {
    'name': 'Y-axis',
    'series': [ ]
  }, {
    'name': 'Z-axis',
    'series': [ ]
  }];
  view: any[] = [800, 500];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date/Time';
  showYAxisLabel = true;
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
    this.dataService.getData(this.alarmKey).subscribe((results) => {
      this.chartdata = true;
      this.prepChartData(results);
    });
  }

  prepChartData(entries: any[]) {
    entries.forEach(element => {
      const datetime = element.createdAt.toString();
      if (element.x) {
        this.data[0]['series'].push({'name': datetime, 'value': element.x});
      }
      if (element.y) {
        this.data[1]['series'].push({'name': datetime, 'value': element.y});
      }
      if (element.z) {
        this.data[2]['series'].push({'name': datetime, 'value': element.z});
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
