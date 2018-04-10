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

  /**
   * Next (emits the error string value on authError subject)
   * @param error
   */
  authenticationErrorAlert(error?: Error) {
    error ? this.dataStringSource$.next(error.message) :
    this.dataStringSource$.next('Authentication error');
  }

  /**
   * Next (emits message string value on login subject)
   * @param message
   */
  authenticationSuccessAlert(message?: string) {
    message ? this.dataStringSource$.next(message) :
    this.dataStringSource$.next('Successful Login');

  }

  /**
   * Next (emits error string value on reg error subject)
   * @param error
   */
  registrationErrorAlert(error?: Error) {
    error ? this.dataStringSource$.next(error.message) :
    this.dataStringSource$.next('Firebase registration error');
  }

}
