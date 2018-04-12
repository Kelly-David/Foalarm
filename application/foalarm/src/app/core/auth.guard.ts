/*
 * File: auth.guard.ts
 * Project: /Users/david/Foalarm/application/foalarm
 * File Created: Thursday, 14th December 2017 3:23:24 pm
 * Author: david
 * -----
 * Last Modified: Thursday, 12th April 2018 2:49:12 pm
 * Modified By: david
 * -----
 * Description: Authentication Guard
 */

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  /**
   * Determines if the user can activate the target route
   * @param next
   * @param state
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.auth.user
      .take(1)
      .map(user => !!user)
      .do(loggedIn => {
        if (!loggedIn) {
          console.log('Access Denied');
          this.router.navigate(['/login']);
        }
      });
  }
}
