import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { User } from '../../user';
import { AuthGuard } from '../../auth/auth.guard';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  isNewUser: boolean;
  userKey: string;
  user$: FirebaseObjectObservable<User> | Observable<any>;
  authuser: User;

  constructor(
    private router: Router, // route after a successful save event
    private activatedRoute: ActivatedRoute, // get params from URL
    private userService: UserService,
    private authGuard: AuthGuard) { }

  ngOnInit() {
    this.authuser = this.authGuard.user;
    this.userKey = this.activatedRoute.snapshot.params['id']; // Grab the id from URL params
    this.isNewUser = this.userKey === 'new'; // True if userKey is 'new'
    !this.isNewUser ? this.getUser() : this.user$ = Observable.of({}) as FirebaseObjectObservable<User>;
  }

  getUser() {
    this.user$ = this.userService.getUser(this.userKey);
  }

  saveUser(user) {
    user.uid = this.authuser.uid;
    const save = this.isNewUser ?
    this.userService.saveUser(user) :
    this.userService.editUser(user);

    save.then(_ => this.router.navigate([`user-list`]));
  }

  deleteUser(user) {
    this.userService.deleteUser(user)
    .then(_ => this.router.navigate([`user-list`]));
  }

}
