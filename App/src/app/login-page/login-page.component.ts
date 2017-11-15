/*
 * @Author: David Kelly
 * @Date: 2017-10-26 14:51:05
 * @Last Modified time: 2017-10-26 14:51:05
 */

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AlertHandlerService } from '../alert-handler.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit {
  loginform = new FormGroup ({
    username: new FormControl ('', Validators.required),
    password: new FormControl ('', Validators.required)
  });
  public username: string;
  public password: string;
  public submitted = false;
  public alertString: string; // Alert message string received from authService

  constructor(
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
  }
  // Login function
  login(userEmail?: string, userPassword?: string) {
    console.log(this.loginform.value, this.loginform.value.username);
    this.authService.login(this.loginform.value.username, this.loginform.value.password);
  }
  // TODO: Remove
  loginWithForm() {
    console.log( this.username + this.password );
    this.submitted = true;
  }
  // TODO: Remove
  printInputToScreen() {
    console.log(this.username);
    console.log(this.password);
  }

}
