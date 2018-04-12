/*
 * File: login.component.ts
 * Project: /Users/david/Foalarm/application/foalarm
 * File Created: Friday, 10th October 2017 2:16:14 pm
 * Author: david
 * -----
 * Last Modified: Thursday, 12th April 2018 3:44:06 pm
 * Modified By: david
 * -----
 * Description: User Login Form
 */
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { AlertHandlerService } from '../alert-handler.service';
import { User } from '../user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

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
    // Subscribe to AlertHandlerService to recive authentication errors
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

  // Form getters
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  /**
   * Call Google sign in service
   */
  signin() {
    return this.authService.login(this.email.value, this.password.value);
  }
}
