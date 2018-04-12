/*
 * File: horse-edit.component.ts
 * Project: /Users/david/Foalarm/application/foalarm
 * File Created: Wednesday, 20th December 2017 9:50:48 pm
 * Author: david
 * -----
 * Last Modified: Thursday, 12th April 2018 10:25:16 am
 * Modified By: david
 * -----
 * Description: Edit/Create a horse document.
 */

import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-horse-edit',
  templateUrl: './horse-edit.component.html',
  styleUrls: ['./horse-edit.component.css']
})
export class HorseEditComponent implements OnInit {

  horseForm: FormGroup;

  public horseObject = {} as Horse;
  isNewHorse: boolean;
  horseKey: string;
  horse$: Observable<Horse> | Observable<any>;
  public alertString: string;
  public loading = false as Boolean;
  public loaded = true as Boolean;

  constructor(
    // private router: Router,
    private activatedRoute: ActivatedRoute,
    private horseService: HorseService,
    public authService: AuthService,
    public fb: FormBuilder,
    private alertHandler: AlertHandlerService,
    private db: FirestoreService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    // Get the key from the URL param
    this.horseKey = this.activatedRoute.snapshot.params['id'];
    // Is it a new horse
    this.isNewHorse = this.horseKey === 'new';
    // Retrieve the horse instance OR create a new object observable
    !this.isNewHorse ? this.getHorse() : this.horse$ = Observable.of({}) as Observable<Horse>;
    console.log(this.horseKey);

    // Subscribe to alertHandler for firebase registration errors
    this.alertHandler.registrationError$.subscribe((data) =>
      this.alertString = data);

    // Create horse form
    this.horseForm = this.fb.group({
      'displayName': ['', [Validators.required]],
      'dueDate': ['', [Validators.required]],
      'camera': ['', []],
      'photoURL': ['', []]
    });
  }

  // Form Getters
  get displayName() { return this.horseForm.get('displayName'); }
  get dueDate() { return this.horseForm.get('dueDate'); }
  get camera() { return this.horseForm.get('camera'); }
  get photoURL() { return this.horseForm.get('photoURL'); }

  /**
   * Returns an observable of type Horse
   */
  private getHorse() {
    this.horse$ = this.horseService.getHorse(this.horseKey);
  }

  /**
   * Save a new horse
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
      ownerUID: user.uid
    });
  }

  /**
   * Update the existing horse
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
    }, currentAlarmId);
  }

  /**
   * Save horse properties.
   * If creating new horse - save
   * If horse exitis - update
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
   * Upload a selected file to Google storage.
   * Then assign the download URL to this horse obj
   * @param horse
   * @param event
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
   * Receive a string emitted from child component
   * @param  event as string
   */
  public receiveSelectedOption($event) {
    this.horseObject.alarmId = $event;
  }

  /**
   * Delete a horse (update deleted = true)
   * @param horse the horse object
   */
  public delete(horse: Horse) {
    return this.horseService.deleteHorse(horse);
  }

  /**
   * Bypass security for image binding.
   * @param imageUrl the download URL of image from storage
   */
  public getStyle(imageUrl) {
    const style = `background-image: url(${imageUrl}) !important; background-size: cover; background-position: center`;
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }

}
