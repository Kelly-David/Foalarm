/*
 * File: alarm-edit.component.ts
 * Project: /Users/david/Foalarm/application/foalarm
 * File Created: Tuesday, 27th March 2018 10:45:49 am
 * Author: david
 * -----
 * Last Modified: Thursday, 12th April 2018 1:08:48 pm
 * Modified By: david
 * -----
 * Description: Creat or Edit an alarm document
 */

import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
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
export class AlarmEditComponent implements OnChanges {

  @Input() alarmId: any;
  @Output() setTitle = new EventEmitter<string>();
  @Output() closeParent = new EventEmitter<string>();

  public alarmForm: FormGroup;
  public alarmObject = {} as Alarm;
  public isNewAlarm: boolean;
  public alarm$: Observable<Alarm> | Observable<any>;
  public alertString;
  public exists = false as boolean;
  public selectedId = '' as string;
  public edit = false as boolean;
  public editNumber = false as boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private alarmService: AlarmService,
    public authService: AuthService,
    public fb: FormBuilder,
    private ahs: AlertHandlerService
    ) { }

  ngOnChanges() {
    this.setTitle.emit('Alarm | Edit');
    // Is it a new alarm?
    this.isNewAlarm = this.alarmId === 'new';
    // Retrieve the alarm instance OR create a new object observable
    !this.isNewAlarm ? this.getAlarm() : this.alarm$ = Observable.of({}) as Observable<Alarm>;
    if (this.isNewAlarm) {
      this.setTitle.emit('Alarm | New');
      this.edit = this.editNumber = true;
    }
    // Create the alarm form
    this.buildForm();
  }

  // Form getters
  get displayName() { return this.alarmForm.get('displayName'); }
  get emailAddress() { return this.alarmForm.get('emailAddress'); }

  /**
   * Build the Alarm form
   */
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

  /**
   * helper to add validations to form based on min/max length
   * @param min
   * @param max
   */
  public validateMinMax(min, max) {
    return ['', [
      // Validators.required,
      Validators.minLength(min),
      Validators.maxLength(max),
      Validators.pattern('[0-9]+')  // validates input is digit
    ]];
  }

  /**
   * Helper function to validate email and displayName
   */
  public validateString() {
    return ['', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(50),
      Validators.pattern('[a-zA-Z0-9.@,\s-]{1,50}')
    ]];
  }

  /**
   * Converts the current form phone values to E164 compliant
   */
  get e164() {
    const form = this.alarmForm.value;
    const num = form.country + form.area + form.prefix + form.line;
    return `+${num}`;
  }

  /**
   * Return an observable of the alarm
   */
  private getAlarm() {
    this.alarm$ = this.alarmService.getAlarm(this.alarmId);
  }

  /**
   * Save form data
   * @param user authUser
   * @param alarm this.alarm
   */
  public save(user: User, alarm: Alarm) {
    if (this.alarmId === 'new') {
      return this.saveAlarm(user, alarm, this.selectedId);
    } else {
      return this.updateAlarm(user, alarm);
    }
  }

  /**
   * Save the alarm
   * @param user authUser
   * @param alarm this.alarm
   * @param selectedId the selected id (id or '')
   */
  private saveAlarm(user: User, alarm: Alarm, selectedId?: string) {
    const form = this.alarmForm.value;
    const id = selectedId ? selectedId : '';
    return this.alarmService.saveAlarmData(this.alarmId, {
      power: '100',
      state: false,
      ownerUID: user.uid,
      phone: this.e164,
      displayName: form.displayName,
      emailAddress: form.emailAddress,
    }, id ? id : undefined)
    // Signal the parent modal to close
    .then(_ => this.closeParent.emit('close'));
  }

  /**
   * Update the alarm
   * @param user authUser
   * @param alarm this.alarm
   */
  private updateAlarm(user: User, alarm: Alarm) {
    const form = this.alarmForm.value;
    return this.alarmService.updateAlarmData(this.alarmId, {
      displayName: form.displayName,
      emailAddress: form.emailAddress,
      // phone: this.e164,
      phone: this.updatedPhone() ? this.e164 : alarm.phone,
    }) // Signal the parent modal to close
    .then(_ => this.closeParent.emit('close'));
  }

  /**
   * Check if the number has changed
   */
  public updatedPhone(): Boolean {
    if (this.e164.length > 1) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Delete the alarm from collection
   * @param alarm this.alarm
   */
  public delete(alarm: Alarm) {
    return this.alarmService.deleteAlarm(alarm)
    .then(_ => this.closeParent.emit('close'));
  }

  /**
   * Receive the alarm Id (new alarms only) from child component
   * @param  event alarmID
   */
  public receiveSelectedId($event) {
    this.selectedId = $event;
    console.log(this.selectedId);

  }
}
