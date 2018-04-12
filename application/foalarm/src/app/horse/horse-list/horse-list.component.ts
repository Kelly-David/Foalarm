/*
 * File: horse-list.component.ts
 * Project: /Users/david/Foalarm/application/foalarm
 * File Created: Wednesday, 20th December 2017 11:32:04 am
 * Author: david
 * -----
 * Last Modified: Thursday, 12th April 2018 11:49:16 am
 * Modified By: david
 * -----
 * Description: Displays a list of all horses.
 */

import { Component, OnInit } from '@angular/core';
import { Horse } from '../../horse';
import { HorseService } from '../horse.service';
import { AlertHandlerService } from '../../alert-handler.service';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../core/auth.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { BsModalService } from 'ngx-bootstrap';
import { BsModalRef } from 'ngx-bootstrap';
import { FormEditModalComponent } from '../../modal/form-edit-modal/form-edit-modal.component';

@Component({
  selector: 'app-horse-list',
  templateUrl: './horse-list.component.html',
  styleUrls: ['./horse-list.component.css']
})
export class HorseListComponent implements OnInit {

  public horse = {} as Horse;
  public horses$: Observable<Horse[]> | Observable<any>;
  bsModalRef: BsModalRef;

  constructor(
    public horseService: HorseService,
    private sanitizer: DomSanitizer,
    private modalService: BsModalService
  ) {
  }

  ngOnInit() {
    this.getHorses();

  }

  /**
   * Returns observable of all horses
   */
  private getHorses() {
    this.horses$ = this.horseService.horses;
  }

  /**
   * Bypass Angular security to bind string to template
   * @param imageUrl the horse.imageURL string
   */
  public getStyle(imageUrl) {
    const style = `background-image: url(${imageUrl}) !important; background-size: cover`;
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }

  /**
   * Create a model dialog - title is passed as input to the child component.
   * @param id the horse instance
   */
  public openClientModal(id?: string) {
    this.bsModalRef = this.modalService.show(FormEditModalComponent, {class: 'modal-dialog'});
    this.bsModalRef.content.parent = 'horse';
    this.bsModalRef.content.key = id;
  }

}
