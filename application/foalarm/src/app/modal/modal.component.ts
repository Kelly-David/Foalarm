import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  public parent: any;
  public title: any;
  public key: any;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  /**
   * Emitted from child component
   * @param  string
   */
  setTitle($event: string) {
    this.title = $event;
  }

}
