/*
 * @Author: David Kelly
 * @Date: 2017-10-30 11:59:51
 * @Last Modified time: 2017-10-30 11:59:51
 */
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { AlertHandlerService } from '../../alert-handler.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform = new FormGroup ({
    username: new FormControl ('', Validators.required),
    password: new FormControl ('', Validators.required)
  });
  public username: string;
  public password: string;
  public alertString: string; // Alert message string received from authService

  constructor(
    public authService: AuthService,
    public alertHandler: AlertHandlerService
  ) { }

  ngOnInit() {
    // Subscribe to AlertHandlerService to recive authentication errors
    this.alertHandler.authenticationError$.subscribe((data) => {
      this.alertString = data;
    });
  }
  // Login function
  login(userEmail?: string, userPassword?: string) {
    console.log(this.loginform.value, this.loginform.value.username);
    this.authService.login(this.loginform.value.username, this.loginform.value.password);
  }

}
