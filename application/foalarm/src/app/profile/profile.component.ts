/*
 * File: profile.component.ts
 * Project: /Users/david/Foalarm/application/foalarm
 * File Created: Tuesday, 19th December 2017 1:30:38 pm
 * Author: david
 * -----
 * Last Modified: Thursday, 12th April 2018 4:14:13 pm
 * Modified By: david
 * -----
 * Description: Application router entry point
 */

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  collapse = false as boolean;

  constructor() { }

  ngOnInit() { }

}
