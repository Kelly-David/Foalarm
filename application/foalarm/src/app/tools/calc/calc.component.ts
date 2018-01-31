import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']
})
export class CalcComponent implements OnInit {

  collapse: Boolean = true;
  service: any;
  foalDate320: any;

  constructor() { }

  ngOnInit() {
  }

  toggleCollapse() {
    this.collapse = !this.collapse;
  }

  getFoalingDates() {
    this.foalDate320 = new Date(this.service);
    this.foalDate320.setDate( this.foalDate320.getDate() + 320 );

    // this.foalDate.day340 = this.foalDate.service + 340;
  }

}
