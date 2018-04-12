/*
 * File: utility.component.ts
 * Project: /Users/david/Foalarm/application/foalarm
 * File Created: Tuesday, 19th December 2017 3:24:28 pm
 * Author: david
 * -----
 * Last Modified: Thursday, 12th April 2018 7:49:15 pm
 * Modified By: david
 * -----
 * Description: Requests permisiion for desktop notifications
 */

import { Component, OnInit} from '@angular/core';
import { HorseService } from '../horse/horse.service';
import { Observable } from 'rxjs/Observable';
import { MessagingService } from '../messaging.service';

@Component({
  selector: 'app-utility',
  templateUrl: './utility.component.html',
  styleUrls: ['./utility.component.css']
})
export class UtilityComponent implements OnInit {

  message;

  constructor(
    private ms: MessagingService,
    public horseService: HorseService
  ) { }

  ngOnInit() {
    this.ms.getPermission();
    this.ms.receiveMessage();
    this.message = this.ms.currentMessage;
  }

}
