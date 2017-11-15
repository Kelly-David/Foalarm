/*
 * @Author: David Kelly
 * @Date: 2017-10-26 15:39:18
 * @Last Modified time: 2017-10-26 15:39:18
 */
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AlertHandlerService } from '../alert-handler.service';
import { User } from '../user';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerform = new FormGroup ({
    fullname: new FormControl ('', Validators.required),
    username: new FormControl ('', Validators.required),
    password: new FormControl ('', Validators.required),
    foalarmid: new FormControl ('', Validators.required)
  });
  public user = {} as User;
  public alertString: string;

  constructor(
    private authService: AuthService,
    private alertHandler: AlertHandlerService
  ) { }

  ngOnInit() {
    // Subscribe to alertHandler for firebase registration errors
    this.alertHandler.registrationError$.subscribe((data) =>
      this.alertString = data);
  }

  register() {
    this.authService.registerWithUserNameAndPassword(this.user);
  }

}
