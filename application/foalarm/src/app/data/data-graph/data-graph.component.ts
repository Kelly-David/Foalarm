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
}
