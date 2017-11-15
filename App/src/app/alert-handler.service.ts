/*
 * @Author: David Kelly
 * @Date: 2017-10-26 14:58:28
 * @Last Modified time: 2017-10-26 14:58:28
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AlertHandlerService {
  private dataStringSource$ = new Subject<string>();
  public authenticationError$ = this.dataStringSource$.asObservable();
  public authenticationSuccess$ = this.dataStringSource$.asObservable();
  public registrationError$ = this.dataStringSource$.asObservable();

  constructor() { }

  authenticationErrorAlert(error?: Error) {
    error ? this.dataStringSource$.next(error.message) :
    this.dataStringSource$.next('Authentication error');
  }

  authenticationSuccessAlert(message?: string) {
    message ? this.dataStringSource$.next(message) :
    this.dataStringSource$.next('Successful Login');

  }

  registrationErrorAlert(error?: Error) {
    error ? this.dataStringSource$.next(error.message) :
    this.dataStringSource$.next('Firebase registration error');
  }

}
