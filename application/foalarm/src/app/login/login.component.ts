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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  public user = {} as User;
  public alertString: string;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public alertHandler: AlertHandlerService
  ) { }

  ngOnInit() {
    // Subscribe to AlertHnadlerService to recive authentication errors
    this.alertHandler.authenticationError$.subscribe((data) => {
      this.alertString = data;
    });

    // Subscribe to AlertHnadlerService to recive authentication errors
    this.alertHandler.authenticationSuccess$.subscribe((data) => {
      this.alertString = data;
    });

    // Create loginForm form
    this.loginForm = this.fb.group({
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
  }

  // Getters = pretty code!
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  // Step 1
  signin() {
    return this.authService.login(this.email.value, this.password.value);
  }
}
