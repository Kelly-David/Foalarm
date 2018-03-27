import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-horse-edit-form',
  templateUrl: './horse-edit-form.component.html',
  styleUrls: ['./horse-edit-form.component.css']
})
export class HorseEditFormComponent implements OnChanges {

  @Input() horseId: any;
  @Output() setTitle = new EventEmitter<string>();
  @Output() closeParent = new EventEmitter<string>();

  constructor() { }

  ngOnChanges() {
    this.setTitle.emit('Horse | Edit');
  }

}
