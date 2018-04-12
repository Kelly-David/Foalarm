/*
 * File: register.component.ts
 * Project: /Users/david/Foalarm/application/foalarm
 * File Created: Tuesday, 19th October 2017 7:55:36 am
 * Author: david
 * -----
 * Last Modified: Thursday, 12th April 2018 7:42:27 pm
 * Modified By: david
 * -----
 * Description:
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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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

    // Create signup form
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

    // Create user detail form
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
   * Register a user with email and password
   */
  signup() {
    return this.authService.register(this.email.value, this.password.value);
  }

  /**
   * Create the user profile
   * @param user authUser
   */
  setFoalarm(user) {
    return this.authService.updateUserData(user, {
      fullName: this.fullName.value,
      foalarm: this.foalarm.value,
      location: this.location.value,
      photoURL: this.user.photoURL
    });
  }

  /**
   * Upload a file to Google storage
   * Then set the dowload url as user property
   * @param user
   * @param event file
   */
  uploadFile(user: User, event: any) {
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

