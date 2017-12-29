import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Alarm } from '../../alarm';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { AlarmService } from '../alarm.service';
import { AuthService } from '../../core/auth.service';
import { AlertHandlerService } from '../../alert-handler.service';

@Component({
  selector: 'app-alarm-edit',
  templateUrl: './alarm-edit.component.html',
  styleUrls: ['./alarm-edit.component.css']
})
export class AlarmEditComponent implements OnInit {

  alarmForm: FormGroup;
  public alarmObject = {} as Alarm;
  isNewAlarm: boolean;
  alarmKey: string;
  alarm$: Observable<Alarm> | Observable<any>;
  public alertString;
  exists = false as boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private alarmService: AlarmService,
    private authService: AuthService,
    public fb: FormBuilder,
    private ahs: AlertHandlerService
  ) { }

  ngOnInit() {
    // Get the key from the URL
    this.alarmKey = this.activatedRoute.snapshot.params['id'];
    // Is it a new alarm?
    this.isNewAlarm = this.alarmKey === 'new';
    // Retrieve the alarm instance OR create a new object observable
    !this.isNewAlarm ? this.getAlarm() : this.alarm$ = Observable.of({}) as Observable<Alarm>;
    // Testing
    console.log(this.alarmKey);
  }


  private getAlarm(): Observable<Alarm> {
    // TODO
    return null;
  }
}
