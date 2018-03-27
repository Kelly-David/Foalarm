import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alarm-edit-form',
  templateUrl: './alarm-edit-form.component.html',
  styleUrls: ['./alarm-edit-form.component.css']
})
export class AlarmEditFormComponent implements OnInit {

  @Input() alarmId: any;

  constructor() { }

  ngOnInit() {
  }

}
