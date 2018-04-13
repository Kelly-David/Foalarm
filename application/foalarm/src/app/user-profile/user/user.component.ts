/*
 * File: user.component.ts
 * Project: /Users/david/Foalarm/application/foalarm
 * File Created: Sunday, 1st April 2018 1:56:49 pm
 * Author: david
 * -----
 * Last Modified: Friday, 13th April 2018 9:30:35 am
 * Modified By: david
 * -----
 * Description: Displays a user doc
 */

import { Component, EventEmitter, OnChanges, Input, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnChanges {

  @Input() uid: any; // The UID of the user
  @Output() closeParent = new EventEmitter<string>();
  user$: Observable<{}> | Observable<any>;
  friend$: Observable<{}>;

  constructor(
    private userService: UserService
  ) { }

  ngOnChanges() {
    this.user$ = this.userService.getUser(this.uid);
    this.friend$ = this.userService.getFriend(this.uid);
  }

  /**
   * Remove a user from authUser friend list
   */
  public removeFriend() {
    return this.userService.removeUserFromFriendList(this.uid)
    .then(_ => this.closeParent.emit('close'));
  }

}
