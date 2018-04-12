/*
 * File: public-horse-list.component.ts
 * Project: /Users/david/Foalarm/application/foalarm
 * File Created: Saturday, 31st March 2018 9:50:24 am
 * Author: david
 * -----
 * Last Modified: Thursday, 12th April 2018 7:40:43 pm
 * Modified By: david
 * -----
 * Description: Base public horse list component. Contains a
 * list of friends' (users) list of public horses.
 */

import { Component, OnInit } from '@angular/core';
import { PublicService } from '../public.service';
import { Observable } from 'rxjs/Observable';
import { Horse } from '../../horse';
import { UserService } from '../../user-profile/user.service';

@Component({
  selector: 'app-public-horse-list',
  templateUrl: './public-horse-list.component.html',
  styleUrls: ['./public-horse-list.component.css']
})
export class PublicHorseListComponent implements OnInit {

  public horses$: Observable<Horse[]>;
  public friends$: Observable<any[]>;
  public collapse = false as boolean;
  public isCollapsed: boolean;

  constructor(
    private publicService: PublicService,
    private us: UserService
  ) { }

  ngOnInit() {
    this.horses$ = this.publicService.publicHorses;
    this.friends$ = this.us.friends();
  }

  /**
   * Show or hide the list of horses in the template
   */
  public toggleCollapse() {
    this.collapse = !this.collapse;
  }

}
