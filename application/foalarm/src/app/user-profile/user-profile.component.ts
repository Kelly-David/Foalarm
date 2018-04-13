/*
 * File: user-profile.component.ts
 * Project: /Users/david/Foalarm/application/foalarm
 * File Created: Sunday, 17th October 2017 12:30:13 pm
 * Author: david
 * -----
 * Last Modified: Friday, 13th April 2018 9:17:38 am
 * Modified By: david
 * -----
 * Description: Display/Update the user profile
 */

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { AlertHandlerService } from '../alert-handler.service';
import { User } from '../user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import 'firebase/storage';

@Component({
  selector: 'app-user-proifle',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  signupForm: FormGroup;
  detailForm: FormGroup;

  public user = {} as User;
  public alertString: string;
  public loading = false as Boolean;
  public loaded = false as Boolean;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public alertHandler: AlertHandlerService
  ) { }

  ngOnInit() {
    // Subscribe to alertHandler for firebase registration errors
    this.alertHandler.registrationError$.subscribe((data) =>
      this.alertString = data);

    // Create form
    this.signupForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ]
      ],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25),
        Validators.required
      ]
      ]
    });

    // Create detail form
    this.detailForm = this.fb.group({
      'foalarm': ['', [
        Validators.required
      ]],
      'fullName': ['', [
        Validators.required
      ]],
      'location': ['', [
        Validators.required
      ]],
      'photoURL': ['', []]
    });
  }

  // Form getters
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
  get foalarm() { return this.detailForm.get('foalarm'); }
  get fullName() { return this.detailForm.get('fullName'); }
  get location() { return this.detailForm.get('location'); }
  get photoURL() { return this.detailForm.get('photoURL'); }

  /**
   * Update the user document
   * @param user authUser
   */
  public updateUser(user) {
    return this.authService.updateUserData(user, {
      fullName: this.fullName.value,
      foalarm: this.foalarm.value,
      location: this.location.value,
      photoURL: this.user.photoURL
    });
  }

  /**
   * Save the image file in cloud storage
   * Then, add the download url to this user
   * @param user authUser
   * @param event file
   */
  public uploadFile(user: User, event: any) {
    this.loading = true;
    const file = event.srcElement.files[0];
    const storageRef = firebase.storage().ref(`users/${user.uid}`);
    console.log(user.uid);
    storageRef.put(file)
      .then(uploadTask => this.user.photoURL = uploadTask.downloadURL)
      .then(_ => {
        this.loaded = true;
      });
  }

}
