/*
 * File: public-friends-horse-list.component.ts
 * Project: /Users/david/Foalarm/application/foalarm
 * File Created: Thursday, 5th April 2018 8:42:58 am
 * Author: david
 * -----
 * Last Modified: Thursday, 12th April 2018 7:36:21 pm
 * Modified By: david
 * -----
 * Description: Public Friends Horse list displays a list of public
 * horses owned by a user (friend).
 */

import { Component, OnChanges, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PublicService } from '../public.service';

@Component({
  selector: 'app-public-friends-horse-list',
  templateUrl: './public-friends-horse-list.component.html',
  styleUrls: ['./public-friends-horse-list.component.css']
})
export class PublicFriendsHorseListComponent implements OnChanges {

  @Input() friend: any;
  public frHorses$: Observable<any[]>;

  constructor(
    private ps: PublicService
  ) { }

  ngOnChanges() {
    this.frHorses$ = this.ps.friendsHorses(this.friend);
  }

}
