/*
 * File: form-edit-modal.component.ts
 * Project: /Users/david/Foalarm/application/foalarm
 * File Created: Tuesday, 27th March 2018 10:27:59 am
 * Author: david
 * -----
 * Last Modified: Thursday, 12th April 2018 4:08:24 pm
 * Modified By: david
 * -----
 * Description: Generic Modal
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-form-edit-modal',
  templateUrl: './form-edit-modal.component.html',
  styleUrls: ['./form-edit-modal.component.css']
})
export class FormEditModalComponent implements OnInit {

  public parent: string;
  public title: string;
  public key: string;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() { }

  /**
   * Receives the title to display from child component
   * @param event
   */
  setTitle($event: string) {
    this.title = $event;
  }

}
