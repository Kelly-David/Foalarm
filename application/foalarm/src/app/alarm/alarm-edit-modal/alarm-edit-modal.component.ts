import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-alarm-edit-modal',
  templateUrl: './alarm-edit-modal.component.html',
  styleUrls: ['./alarm-edit-modal.component.css']
})
export class AlarmEditModalComponent implements OnInit {

  public title: string;
  public key: string;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  setTitle($event: string) {
    this.title = $event;
  }

}
