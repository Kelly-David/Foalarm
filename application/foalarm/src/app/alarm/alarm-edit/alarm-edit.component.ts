import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Alarm } from '../../alarm';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { AlarmService } from '../alarm.service';
import { AuthService } from '../../core/auth.service';
import { AlertHandlerService } from '../../alert-handler.service';
import { User } from '../../user';

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
    public authService: AuthService,
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

    // TODO Subscribe to alert handler service

    // Create the alarm form

    this.buildForm();

  }

  // Form getters
  get displayName() { return this.alarmForm.get('displayName'); }
  get emailAddress() { return this.alarmForm.get('emailAddress'); }

  // Build the Alarm form
  buildForm() {
    this.alarmForm = this.fb.group({
      displayName:  this.validateString(),
      emailAddress: this.validateString(),
      country: this.validateMinMax(3, 3),
      area:    this.validateMinMax(2, 2),
      prefix:  this.validateMinMax(3, 3),
      line:    this.validateMinMax(4, 4)
    });
  }

  /// helper to add validations to form based on min/max length
  validateMinMax(min, max) {
    return ['', [
      // Validators.required,
      Validators.minLength(min),
      Validators.maxLength(max),
      Validators.pattern('[0-9]+')  // validates input is digit
    ]];
  }

  // helper function to validate email and displayName
  validateString() {
    return ['', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(50),
      Validators.pattern('[a-zA-Z0-9.@,\s-]{1,50}')
    ]];
  }

  /// converts the current form values to E164
  get e164() {
    const form = this.alarmForm.value;
    const num = form.country + form.area + form.prefix + form.line;
    return `+${num}`;
  }

  // Return an observable of the alarm
  private getAlarm() {
    // TODO
    this.alarm$ = this.alarmService.getAlarm(this.alarmKey);
  }

  save(user: User, alarm: Alarm) {
    if (this.alarmKey === 'new') {
      return this.saveAlarm(user, alarm);
    } else {
      return this.updateAlarm(user, alarm);
    }
  }

  // Save the alarm
  saveAlarm(user: User, alarm: Alarm) {
    const form = this.alarmForm.value;
    return this.alarmService.saveAlarmData(this.alarmKey, {
      power: '100',
      state: false,
      ownerUID: user.uid,
      phone: this.e164,
      displayName: form.displayName,
      emailAddress: form.emailAddress,
    });
  }

  // Save the alarm
  updateAlarm(user: User, alarm: Alarm) {
    const form = this.alarmForm.value;
    return this.alarmService.updateAlarmData(this.alarmKey, {
      displayName: form.displayName,
      emailAddress: form.emailAddress,
      // phone: this.e164,
      phone: this.e164 ? this.e164 : alarm.phone ,
    });
  }

  delete(alarm: Alarm) {
    return this.alarmService.deleteAlarm(alarm);
  }
}
