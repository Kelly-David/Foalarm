import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../../user';
import { FirebaseListObservable } from 'angularfire2/database';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users$: FirebaseListObservable<User[]> | Observable<any>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.users$ = this.userService.getUsers();
  }

}
