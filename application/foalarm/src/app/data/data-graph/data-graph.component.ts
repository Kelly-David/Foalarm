/*
 * File: data-graph.component.ts
 * Project: /Users/david/Foalarm/application/foalarm
 * File Created: Thursday, 25th January 2018 12:00:32 pm
 * Author: david
 * -----
 * Last Modified: Thursday, 12th April 2018 3:19:03 pm
 * Modified By: david
 * -----
 * Description: Displays the activity data graph
 */

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import 'rxjs/add/operator/takeWhile';

@Component({
  selector: 'app-data-graph',
  templateUrl: './data-graph.component.html',
  styleUrls: ['./data-graph.component.css']
})
export class DataGraphComponent implements OnInit {

  public chartdata = false as boolean;
  public alarmKey: string;
  public data$: Observable<any> | null;
  public data: any[];
  public timeframe = [
    {label: 1, value: 360},
    {label: 5, value: 1800},
    {label: 10, value: 3600},
    {label: 24, value: 8640}] as object[];
  private subscription: any;
  public alive = true as boolean;
  public view: any[] = [923, 500]; // Removed from chart properties

  // Graph options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = false;
  xAxisLabel = 'Date/Time';
  showYAxisLabel = false;
  yAxisLabel = 'Value';
  colorScheme = { domain: ['#2c6a87', '#A10A28', '#419171', '#AAAAAA'] };

  // line, area
  autoScale = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
  ) { }

  ngOnInit() {
    // Get the alarm hey from the url
    this.alarmKey = this.activatedRoute.snapshot.params['id'];

    // Retrieve the instance from Firebase RTDB
    this.subscribeToChart();
  }

  /**
   * Create a subscription to the data collection. Results are passed as tuple to chart.
   * @param limit num of data points
   */
  private subscribeToChart(limit = 1800 as number) {
    this.alive = true;
    this.subscription = this.dataService.getActivityData(this.alarmKey, limit).takeWhile(() => this.alive).subscribe((results) => {
      this.chartdata = true;
      // Pass results as immutable
      this.prepChartData([...results]);
    });
  }

  /**
   * Kills the current subscription, then calls subscribe again to rebuild the chart using new request
   * @param limit new num of data points
   */
  public unsubscribe(limit: any) {
    this.alive = false;
    this.subscribeToChart(limit);
  }

  /**
   * Renders the chart
   * @param entries tuple of data points
   */
  private prepChartData(entries) {
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

  // Chart Functions
  onChartClick(event) {
    console.log(event);
  }
  onSelect(event) {
    console.log(event);
  }

}
