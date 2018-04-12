/*
 * File: horse-edit.component.ts
 * Project: /Users/david/Foalarm/application/foalarm
 * File Created: Tuesday, 27th March 2018 4:50:00 pm
 * Author: david
 * -----
 * Last Modified: Thursday, 12th April 2018 11:46:28 am
 * Modified By: david
 * -----
 * Description: Create or edit a horse document.
 */

import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { Horse } from '../../horse';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { HorseService } from '../horse.service';
import { AuthService } from '../../core/auth.service';
import { User } from '../../user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertHandlerService } from '../../alert-handler.service';
import { FirestoreService } from '../../firestore.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HorseObj } from '../../horse-obj';

@Component({
  selector: 'app-horse-edit',
  templateUrl: './horse-edit.component.html',
  styleUrls: ['./horse-edit.component.css']
})
export class HorseEditComponent implements OnChanges {

  @Input() horseId: any;
  @Output() setTitle = new EventEmitter<string>();
  @Output() closeParent = new EventEmitter<string>();

  horseForm: FormGroup;
  public horseObject = {} as Horse;
  isNewHorse: boolean;
  horseKey: string;
  horse$: Observable<Horse> | Observable<any>;
  public alertString: string;
  public loading = false as Boolean;
  public loaded = false as Boolean; // image is required
  public isPublic = false as Boolean;
  public isCollapsed: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private horseService: HorseService,
    public authService: AuthService,
    public fb: FormBuilder,
    private alertHandler: AlertHandlerService,
    private db: FirestoreService,
    private sanitizer: DomSanitizer) { }
    public edit = false as boolean;
    public editNumber = false as boolean;

  ngOnChanges() {
    this.setTitle.emit('Horse | Edit');
    this.horseKey = this.horseId;
    // Is it a new horse
    this.isNewHorse = this.horseKey === 'new';
    // Retrieve the horse instance OR create a new object observable
    !this.isNewHorse ? this.getHorse() : this.horse$ = Observable.of({}) as Observable<Horse>;
    if (this.isNewHorse) {
      this.setTitle.emit('Horse | New');
      this.edit = this.editNumber = true;
    }

    // Subscribe to alertHandler for firebase registration errors
    this.alertHandler.registrationError$.subscribe((data) =>
      this.alertString = data);

    // Create horse form
    this.horseForm = this.fb.group({
      'displayName': ['', [Validators.required]],
      'dueDate': ['', [Validators.required]],
      'camera': ['', []],
      'photoURL': ['', []],
      'check': ['', []]
    });
  }

  // Form Getters
  get displayName() { return this.horseForm.get('displayName'); }
  get dueDate() { return this.horseForm.get('dueDate'); }
  get camera() { return this.horseForm.get('camera'); }
  get photoURL() { return this.horseForm.get('photoURL'); }
  get check() { return this.horseForm.get('check'); }

  /**
   * Returns an observable of type Horse
   */
  getHorse() {
    this.horse$ = this.horseService.getHorse(this.horseKey);
  }

  /**
   * Save a new horse Horse
   * @param user
   * @param horse
   */
  private saveHorse(user: User, horse: Horse) {
    return this.horseService.saveHorseData(user, this.horseKey, {
      displayName: this.displayName.value,
      dueDate: this.dueDate.value,
      camera: this.camera.value ? this.camera.value : '',
      photoURL: this.horseObject.photoURL,
      alarmId: this.horseObject.alarmId ? this.horseObject.alarmId : '' ,
      state: this.horseObject.alarmId ? true : false,
      ownerUID: user.uid,
      isPublic: false
    })
    .then(_ => this.closeParent.emit('close'));
  }

  /**
   * Update an existing horse
   * @param user
   * @param horse
   * @param currentAlarmId
   */
  private updateHorse(user: User, horse: Horse, currentAlarmId?: string) {
    return this.horseService.updateHorseData(user, this.horseKey,  {
      displayName: this.displayName.value,
      dueDate: this.dueDate.value,
      camera: this.camera.value ? this.camera.value : '',
      alarmId: this.horseObject.alarmId ? this.horseObject.alarmId : horse.alarmId,
      photoURL: this.horseObject.photoURL ? this.horseObject.photoURL : horse.photoURL,
      state: this.horseObject.alarmId ? true : horse.state,
      isPublic: this.check.value
    }, currentAlarmId)
    .then(_ => this.closeParent.emit('close'));
  }

  /**
   * Save the horse edit form. If new save, otherwise update.
   * @param user
   * @param horse
   * @param currentAlarmId
   */
  public save(user: User, horse: Horse, currentAlarmId?: string) {
    const save = this.isNewHorse ?
      this.saveHorse(user, horse)
      : this.updateHorse(user, horse, currentAlarmId);
  }

  /**
   * Uploads the selected file to storage.
   * Then, assignes the download URL to this horse object
   * @param horse
   * @param event file
   */
  public uploadFile(horse: Horse, event: any) {
    this.loaded = false;
    this.loading = true;
    const time = new Date();
    const file = event.srcElement.files[0];
    const storageRef = firebase.storage().ref(`horses/${time.getTime()}`);
    storageRef.put(file)
      .then(uploadTask => this.horseObject.photoURL = uploadTask.downloadURL)
      .then(_ => {
        this.loaded = true;
      });
  }

  /**
   * Receives the selected alarm id from child component
   * @param event as string
   */
  public receiveSelectedOption($event) {
    this.horseObject.alarmId = $event;
  }

  /**
   * Removes this horse object
   * (Update: deleted = true)
   * @param horse
   */
  public delete(horse: Horse) {
    return this.horseService.deleteHorse(horse)
    .then(_ => this.closeParent.emit('close'));
  }

  /**
   * Bypass Angular security to bind image url to template
   * @param imageUrl this horse's image url string
   */
  public getStyle(imageUrl) {
    const style = `background-image: url(${imageUrl}) !important; background-size: cover; background-position: center`;
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }

  /**
   * Toggle show/hide public info text
   * @param val
   */
  public togglePublic(val: boolean) {
    if (val) {
      this.isPublic = true;
    } else if (!val) {
      this.isPublic = false;
    }
  }

}
