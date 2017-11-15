import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { User } from '../user';

@Injectable()
export class AuthGuard implements CanActivate {
  public user = {} as User;

  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  canActivate(): Observable<boolean> {
    return this.authService.user$
      .map(user => {
        if (user && user.uid) {
          this.user.name = user.displayName;
          this.user.email = user.email;
          this.user.uid = user.uid;
          this.user.phoneNumber = user.phoneNumber;
          this.user.photoURL = user.photoURL;
          console.log(user.uid);
          return true; // user allowed to navigate
        } else {
          this.router.navigate([`/login`]);
          return false; // user shouldn't be allowed to navigate
        }
      });
  }
}
