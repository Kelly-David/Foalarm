/*
 * File: calc.component.ts
 * Project: /Users/david/Foalarm/application/foalarm
 * File Created: Wednesday, 31st January 2018 10:35:13 am
 * Author: david
 * -----
 * Last Modified: Thursday, 12th April 2018 7:46:41 pm
 * Modified By: david
 * -----
 * Description: Calculates the expected foaling date
 */

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']
})
export class CalcComponent implements OnInit {

  public collapse: Boolean = true;
  public service: any;
  public foalDate320: any;
  public foalDate340: any;

  constructor() { }

  ngOnInit() { }

  /**
   * Show/Hide the HTML element
   */
  toggleCollapse() {
    this.collapse = !this.collapse;
  }

  /**
   * Calculate and set the expected foaling dates
   */
  getFoalingDates() {
    this.foalDate320 = new Date(this.service);
    this.foalDate320.setDate( this.foalDate320.getDate() + 320 );
    this.foalDate340 = new Date(this.service);
    this.foalDate340.setDate( this.foalDate340.getDate() + 340 );
  }

}
