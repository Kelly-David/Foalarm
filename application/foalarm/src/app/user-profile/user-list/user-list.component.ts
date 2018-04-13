/*
 * File: user-list.component.ts
 * Project: /Users/david/Foalarm/application/foalarm
 * File Created: Sunday, 1st April 2018 11:23:24 am
 * Author: david
 * -----
 * Last Modified: Friday, 13th April 2018 9:24:42 am
 * Modified By: david
 * -----
 * Description: Collection of lists of users, friends and friend requests
 */

import { Component, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user.service';
import { FilterPipe, FilterDatePipe, FilterUserPipe } from '../../pipes/alert.pipe';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public users$: Observable<{}[]> | Observable<any>;
  public friends$: Observable<{}[]> | Observable<any>;
  public authUser$: Observable<any>;
  public term: any;
  private param: any;
  public title: string;
  public uString: string;
  public userListView = false as boolean;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.uString = this.auth.uString;
    this.authUser$ = this.userService.getUser(this.uString);
    this.param = this.route.snapshot.params['id'];
    this.title = this.userListView ? 'All Users' : 'Friends';
    this.users$ = this.userService.users();
    this.friends$ = this.userService.users(this.param);
  }

  /**
   * Show or hide a user collection
   */
  public toggleUserList() {
    this.userListView = !this.userListView;
    this.title = this.userListView ? 'All Users' : 'Friends';
  }

}
