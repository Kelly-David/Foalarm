/*
 * File: active-horse.component.ts
 * Project: /Users/david/Foalarm/application/foalarm
 * File Created: Friday, 29th December 2017 12:00:21 pm
 * Author: david
 * -----
 * Last Modified: Thursday, 12th April 2018 10:23:16 am
 * Modified By: david
 * -----
 * Description: Displays all horses that have a wearable
 */

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Horse } from '../../horse';
import { HorseService } from '../horse.service';

@Component({
  selector: 'app-active-horse',
  templateUrl: './active-horse.component.html',
  styleUrls: ['./active-horse.component.css']
})
export class ActiveHorseComponent implements OnInit {

  public activeHorses$: Observable<Horse[]> | Observable<any>;
  collapse = false as boolean;

  constructor(
    public horseService: HorseService
  ) { }

  ngOnInit() {
    this.getActiveHorses();
  }

  /**
   * Returns observable to horse collection where state = true
   */
  private getActiveHorses() {
    this.activeHorses$ = this.horseService.activeHorses;
  }

  /**
   * Show or hide HTML Collapse
   */
  public toggleCollapse() {
    this.collapse = !this.collapse;
  }

}
