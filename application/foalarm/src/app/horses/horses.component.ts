import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-horses',
  templateUrl: './horses.component.html',
  styleUrls: ['./horses.component.css']
})
export class HorsesComponent implements OnInit {

  public horses: number[] = [1, 2, 3, 4, 5, 6, 7, 8];

  constructor() {
  }

  ngOnInit() {
  }

}
