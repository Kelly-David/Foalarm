/*
 * @Author: David Kelly
 * @Date: 2017-10-26 15:39:18
 * @Last Modified time: 2017-10-26 15:39:18
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

  // Getters reduce the amount of typescript code!
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }

  get foalarm() { return this.detailForm.get('foalarm'); }
  get fullName() { return this.detailForm.get('fullName'); }
  get location() { return this.detailForm.get('location'); }
  get photoURL() { return this.detailForm.get('photoURL'); }

  // Step 1
  signup() {
    return this.authService.register(this.email.value, this.password.value);
  }

  // Step 2
  setFoalarm(user) {
    return this.authService.updateUserData(user, {
      fullName: this.fullName.value,
      foalarm: this.foalarm.value,
      location: this.location.value,
      photoURL: this.user.photoURL
    });
  }

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
