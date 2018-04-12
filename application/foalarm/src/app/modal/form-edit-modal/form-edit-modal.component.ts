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

  ngOnInit() {
  }

  setTitle($event: string) {
    this.title = $event;
  }

}
